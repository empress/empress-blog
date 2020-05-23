const BroccoliPlugin = require('broccoli-plugin');
const walkSync = require('walk-sync');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const yamlFront = require('yaml-front-matter');
const yaml = require('js-yaml');

module.exports = class TagIncludePosts extends BroccoliPlugin {
  constructor(folder, options) {
    super([folder], options);
  }

  build() {
    const tagCache = {};
    const contentTags = {};

    this.inputPaths.forEach((dir) => {
      let jsonFiles = walkSync(dir)
        .filter(path => {
          return path.endsWith('.md')
        });

      let contentRegex = /content\/(.*)\.md$/;
      let tagRegex = /tag\/(.*)\.md$/;

      jsonFiles.forEach((file) => {
        if (tagRegex.test(file)) {
          let [, tagId] = file.match(tagRegex);
          tagCache[tagId] = readFileSync(join(dir, file));
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
        }
      });
    });

    Object.keys(tagCache).forEach((tagId) => {
      const frontMatter = yamlFront.loadFront(tagCache[tagId]);
      const content = frontMatter.__content;
      delete frontMatter.__content;

      let linkedContent = contentTags[tagId];

      // sort the refrerenced content by date decending
      linkedContent.sort((a, b) => new Date(b.date) - new Date(a.date));

      if(linkedContent) {
        frontMatter.posts = linkedContent.map(item => item.id);
      }

      const newFile = join(this.outputPath, `${tagId}.md`);

      const fileContent = `---
${yaml.safeDump(frontMatter)}---${content}`;

      writeFileSync(newFile, fileContent);
    });
  }
}
