const { existsSync, readFileSync, writeFileSync, mkdirSync } = require('fs');
const { safeDump } = require('js-yaml');

const importers = require('./importers');

const supportedTypes = ['wordpress'];

function ensureFolder(dir) {
  if (!existsSync(dir)){
    mkdirSync(dir);
  }
}

module.exports = {
  name: 'empress-blog:import',
  description: 'Imports data from other blog systems',
  works: 'insideProject',

  async run(commandOptions, rawArgs) {
    if (!commandOptions.type || !supportedTypes.includes(commandOptions.type)) {
      throw new Error(`You must run this command with the '--type=' parameter. Supported types are: ${supportedTypes}`)
    }

    const fileName = rawArgs[0];

    if (!fileName) {
      throw new Error('You must pass in the export file from your blog as the first argument');
    }

    if (!existsSync(fileName)) {
      throw new Error(`File "${fileName}" does not exits`);
    }

    let data = await importers[commandOptions.type](readFileSync(fileName));

    if(data.tags) {
      ensureFolder('tag');

      data.tags.forEach((tag) => {
        writeFileSync(`tag/${tag.id}.md`, `---
${safeDump({
  name: tag.name,
  image: '',
  imageMeta: ''
})}---
`)
      })
    }

    if(data.authors) {
      ensureFolder('author');

      data.authors.forEach((author) => {
        writeFileSync(`author/${author.id}.md`, `---
${safeDump({
  name: author.name,
  id: author.id,
  image: null,
  coverImage: null,
  website: null,
  twitter: null,
  facebook: null,
  location: null,
})}---
`)
      })
    }

    if(data.content) {
      ensureFolder('author');

      data.content.forEach((content) => {
        writeFileSync(`content/${content.id}.md`, `---
${safeDump({
  title: content.title,
  image: '',
  authors: content.authors,
  date: content.date,
  tags: content.tags,
})}---
${content.content}`)
      })
    }
  },
};
