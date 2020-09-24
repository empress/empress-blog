const BroccoliPlugin = require('broccoli-plugin');
const walkSync = require('walk-sync');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const yamlFront = require('yaml-front-matter');
const yaml = require('js-yaml');

module.exports = class AutomaticNewTag extends BroccoliPlugin {
  constructor(folder, options) {
    super([folder], options);
  }

  build() {
    this.inputPaths.forEach((dir) => {

      const markdownFiles = walkSync(dir)
        .filter(path => path.endsWith('.md'));

      markdownFiles.forEach((file, index) => {
        const fileContents = readFileSync(join(dir, file))
        const frontMatter = yamlFront.loadFront(fileContents);

        if (index < 4) {
          frontMatter.tags.push('new');
        }

        const content = frontMatter.__content;
        delete frontMatter.__content;

        const fileContent = `---
${yaml.safeDump(frontMatter)}---${content}`;

        writeFileSync(join(this.outputPath,file), fileContent);
      });
    });
  }
}
