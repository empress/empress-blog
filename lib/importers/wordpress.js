/* eslint-disable prettier/prettier */
const { promisify } = require('util');
const { parseString } = require('xml2js');
const _ = require('lodash');

const parse = promisify(parseString);

module.exports = async function worpressImport(fileContents) {

  const data = await parse(fileContents);

  let channel = data.rss.channel[0];

  let authors = channel['wp:author'].map((author) => {
    return {
      name: author['wp:author_display_name'][0].trim(),
      id: author['wp:author_login'][0].trim(),
    }
  })

  let postTags = {};

  let content = _.chain(channel.item)
    .map((post) => {
      if(post['wp:post_type'][0].trim() !== 'post') {
        return;
      }

      // don't import draft posts
      if(post['wp:status'][0].trim() !== 'publish') {
        return;
      }

      let result = {
        id: post['wp:post_name'][0].trim(),
        title: post.title[0],
        authors: [post['dc:creator'][0].trim()],
        date: (new Date(post['wp:post_date_gmt'][0])),
        tags: (post.category || []).map((category) => {
          // collect tags from the posts because wordpress exports don't quite
          // include tags correctly
          postTags[category.$.nicename] = category._.trim();
          return category.$.nicename
        }),
        content: post['content:encoded'][0].trim(),
      }

      return result;
    })
    .compact()
    .value();

  let tags = _.map(postTags, (name, id) => {
    return {
      id,
      name,
    }
  })

  return {
    tags,
    authors,
    content,
  }
}
