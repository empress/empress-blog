/* eslint-disable prettier/prettier */
const BroccoliPlugin = require('broccoli-plugin');
const walkSync = require('walk-sync');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const yamlFront = require('yaml-front-matter');
const yaml = require('js-yaml');

module.exports = class AuthorsArray extends BroccoliPlugin {
  constructor(folder, options) {
    super([folder], options);
  }

  build() {
    this.inputPaths.forEach((dir) => {

      const markdownFiles = walkSync(dir)
        .filter(path => path.endsWith('.md'));

      markdownFiles.forEach((file) => {
        const fileContents = readFileSync(join(dir, file))

        const updatedFileContents = modifyFile(fileContents, join(dir, file));

        writeFileSync(join(this.outputPath, file), updatedFileContents);
      });
    });
  }
}

function modifyFile(fileContents, file) {
  const frontMatter = yamlFront.loadFront(fileContents);
  const content = frontMatter.__content;
  delete frontMatter.__content;

  if (frontMatter.author) {
    if (frontMatter.authors) {
      throw new Error(`You cannot define an "author" and "authors", use "authors". File: ${file}`);
    }

    // eslint-disable-next-line no-console
    console.warn(`"author" is deprecated, you must define "authors" now. File: ${file}`);
    frontMatter.authors = [frontMatter.author];
    delete frontMatter.author;
  }

  return `---
${yaml.dump(frontMatter)}---${content}`;
}

module.exports.modifyFile = modifyFile;
