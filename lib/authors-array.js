const BroccoliPlugin = require('broccoli-plugin');
const walkSync = require('walk-sync');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const yamlFront = require('yaml-front-matter');
const yaml = require('js-yaml');

module.exports = class AuthorsArray extends BroccoliPlugin{
    constructor(folder, options) {
        // tell broccoli which "nodes" we're watching
        super([folder], options);
    }

    build() {
        // let dir = 'something'

        // const markdownFiles = walkSync(dir)
        //     .filter(path => path.endsWith('.md'));

        // ['content']

        /**
         * 1. read all the files names in the this.inputPaths (array) folders
         * 2. read all of the file contents (one at a time)
         * 3. write the **updated** file contents (one at a time)
         */
        this.inputPaths.forEach((dir) => {

            const markdownFiles = walkSync(dir)
                .filter(path => path.endsWith('.md'));

            markdownFiles.forEach((file) => {
                // readFileSync(join(path, file))
                const fileContents = readFileSync(join(dir, file))

                
                const updatedFileContents = modifyFile(fileContents, join(dir, file));

                writeFileSync(join(this.outputPath, file), updatedFileContents);
            });
        });

        // where you should write all of your output files
        // this.outputPath
    }
}

function modifyFile(fileContents, file) {
    // currently do nothing
    // TODO: actually modify contents
    const frontMatter = yamlFront.loadFront(fileContents);
    const content = frontMatter.__content;
    if (frontMatter.author) {
        if (frontMatter.authors) {
            throw new Error(`You cannot define an "author" and "authors", use "authors". File: ${file}`);
        }
        // eslint-disable-next-line no-console
        console.warn(`"author" is deprecated, you must define "authors" now. File: ${file}`);
        frontMatter.authors = [frontMatter.author];
        delete frontMatter.author;
    } 
    delete frontMatter.__content;
    return `---
${yaml.safeDump(frontMatter)}---${content}`;
}

module.exports.modifyFile = modifyFile;

