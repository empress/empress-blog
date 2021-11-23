/* eslint-disable prettier/prettier */
const { existsSync, readFileSync, writeFileSync, mkdirSync } = require('fs');
const { safeDump } = require('js-yaml');

const importers = require('./importers');

const supportedTypes = ['wordpress', 'ghost', 'tumblr'];

function ensureFolder(dir) {
  if (!existsSync(dir)){
    mkdirSync(dir);
  }
}

function dump(data) {
  return safeDump(data, { skipInvalid: true });
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
${dump({
  name: tag.name,
  image: '',
})}---
${tag.description}`)
      })
    }

    if(data.authors) {
      ensureFolder('author');

      data.authors.forEach((author) => {
        writeFileSync(`author/${author.id}.md`, `---
${dump({
  name: author.name,
  id: author.id,
  image: author.image,
  coverImage: author.coverImage,
  website: author.website,
  twitter: author.twitter,
  facebook: author.facebook,
  location: author.location,
})}---
${author.bio}`)
      })
    }

    if(data.content) {
      ensureFolder('content');

      data.content.forEach((content) => {
        writeFileSync(`content/${content.id}.md`, `---
${dump({
  title: content.title,
  image: content.image,
  authors: content.authors,
  date: content.date,
  tags: content.tags,
})}---
${content.content}`)
      })
    }
  },
};
