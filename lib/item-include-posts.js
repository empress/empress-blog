/* eslint-disable prettier/prettier */
const BroccoliPlugin = require('broccoli-plugin');
const walkSync = require('walk-sync');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const yamlFront = require('yaml-front-matter');
const yaml = require('js-yaml');
const _ = require('lodash');

module.exports = class ItemIncludePosts extends BroccoliPlugin {
  constructor(folder, options) {
    super([folder], options);
    this.itemType = options.itemType;
  }

  build() {
    const itemCache = {};
    const contentTags = {};
    const contentAuthors = {};

    this.inputPaths.forEach((dir) => {
      let jsonFiles = walkSync(dir)
        .filter(path => {
          return path.endsWith('.md')
        });

      let contentRegex = /content\/(.*)\.md$/;
      let itemRegex = /(tag|author)\/(.*)\.md$/;

      jsonFiles.forEach((file) => {
        if (itemRegex.test(file)) {
          let [,, itemId] = file.match(itemRegex);
          itemCache[itemId] = readFileSync(join(dir, file));
        } else if (contentRegex.test(file)) {

          let [, contentId] = file.match(contentRegex);

          const frontMatter = yamlFront.loadFront(readFileSync(join(dir, file)));

          if(frontMatter.tags) {
            frontMatter.tags.forEach((tag) => {
              if(contentTags[tag]) {
                contentTags[tag].push({id: contentId, date: frontMatter.date});
              } else {
                contentTags[tag] = [{id: contentId, date: frontMatter.date}];
              }
            });
          }

          if(frontMatter.authors) {
            frontMatter.authors.forEach((author) => {
              if(contentAuthors[author]) {
                contentAuthors[author].push({id: contentId, date: frontMatter.date});
              } else {
                contentAuthors[author] = [{id: contentId, date: frontMatter.date}];
              }
            });
          }
        }
      });
    });

    Object.keys(itemCache).forEach((itemId) => {
      const frontMatter = yamlFront.loadFront(itemCache[itemId]);
      const content = frontMatter.__content;
      delete frontMatter.__content;

      let linkedContent

      if(this.itemType === 'tag') {
        linkedContent = contentTags[itemId];
      } else {
        linkedContent = contentAuthors[itemId];
      }

      if(linkedContent) {
        // sort the refrerenced content by date decending
        let postIds = _.chain(linkedContent)
          .sortBy((item) => new Date(item.date))
          .map('id')
          .reverse()
          .value();

        frontMatter.posts = postIds;
      }

      const newFile = join(this.outputPath, `${itemId}.md`);

      const fileContent = `---
${yaml.dump(frontMatter)}---${content}`;

      writeFileSync(newFile, fileContent);
    });
  }
}
