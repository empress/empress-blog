const BroccoliPlugin = require('broccoli-plugin');
const walkSync = require('walk-sync');
const { readFileSync, writeFileSync, existsSync } = require('fs');
const mkdirp = require('mkdirp');
const { join, dirname } = require('path');
const Inflector = require('inflected');
const { assign, concat, flatten, union, uniq, values } = require('lodash');

module.exports = class AddIncludedJson extends BroccoliPlugin {
  constructor(folder, options) {
    super([folder], options);

    //TODO assign default value to options
    this.options = options || {};
  }

  build() {
    const folders = Object.keys(this.options.include);

    // here we take the assumption that we can only "include" data for which a json file exists
    const allFolders = union(
      flatten(values(this.options.include)),
      folders
    );

    // load the relevant JSON into a map
    const jsonPerFolder = new Map();
    this.inputPaths.forEach((dir) => {
      allFolders.forEach(folder => {
        const jsonFiles = walkSync(join(dir, folder))
          .filter(path => path.endsWith('.json'));

        jsonFiles.forEach(file => {
          const filePath = join(folder, file);
          const fileData = {
            path: filePath,
            json: JSON.parse(readFileSync(join(dir, filePath)))
          };

          if(jsonPerFolder.has(folder)){
            jsonPerFolder.set(folder, concat(jsonPerFolder.get(folder), fileData));
          } else {
            jsonPerFolder.set(folder, [fileData]);
          }
        });
      });

      folders.forEach(folder => {
        const toInclude = this.options.include[folder];

        jsonPerFolder.get(folder).forEach(jsonItem => {
          const filePath = jsonItem.path;
          const resource = jsonItem.json;

          toInclude.map(type => {
            let included;
            if(Array.isArray(resource.data)){
              included = getIncluded(type, resource.data, jsonPerFolder);
            } else {
              included = getIncluded(type, [resource.data], jsonPerFolder);
            }

            const json = JSON.stringify(assign({}, resource, {included}));

            const outputFilePath = join(this.outputPath, filePath);
            mkdirp.sync(dirname(outputFilePath));
            writeFileSync(outputFilePath, json);
          });
        })
      });
    });
  }
};

function getIncluded(type, resources, jsonPerFolder){
  let included = [];

  resources.forEach(resource => {
    if(resource.relationships){
      const relationships = resource.relationships;

      //TODO: is there ever a non plural relationship? (one-to-x)
      const pluralType = Inflector.pluralize(type);
      let relData;
      if(Object.keys(resource.relationships).includes(type)){
        relData = relationships[type];
      } else if(Object.keys(relationships).includes(pluralType)){
        relData = relationships[pluralType];
      } else {
        //TODO: throw error?
      }

      const ids = Array.isArray(relData.data)
        ? relData.data.map(obj => obj.id)
        : [relData.data.id];

      included = included.concat(jsonPerFolder
        .get(type)
        .filter(r => ids.includes(r.json.data.id))
        .map(r => r.json.data));
    }
  });

  return uniq(included);
}
