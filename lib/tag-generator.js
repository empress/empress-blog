/* eslint-disable prettier/prettier */
const BroccoliPlugin = require('broccoli-plugin');
const walkSync = require('walk-sync');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const yamlFront = require('yaml-front-matter');
const _ = require('lodash');
const Case = require('case');

module.exports = class TagGenerator extends BroccoliPlugin {
  constructor(folder, options) {
    super([folder], options);
  }

  build() {
    const tags = [];
    this.inputPaths.forEach((dir) => {

      const markdownFiles = walkSync(dir)
        .filter(path => path.endsWith('.md'));

      markdownFiles.forEach((file) => {
        const fileContents = readFileSync(join(dir, file))
        const frontMatter = yamlFront.loadFront(fileContents);

        tags.push(frontMatter.tags);
      });
    });

    _.chain(tags).flatten().uniq().compact().value().forEach((tag) => {
      writeFileSync(join(this.outputPath, `${Case.kebab(tag)}.md`), `---
name: ${Case.title(tag)}
id: ${Case.kebab(tag)}
image:
imageMeta:
---
`);
    })
  }
}
