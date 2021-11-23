/* eslint-disable prettier/prettier */
const { promisify } = require("util");
const { parseString } = require("xml2js");
const _ = require("lodash");

const parse = promisify(parseString);

module.exports = async function tumblrImport(fileContents) {
  const data = await parse(fileContents);

  let channel = data.tumblr.posts[0];

  let allAuthors = [];
  let allTags = [];

  let allContent = _.chain(channel.post)
    .map(post => {
      let postType = post.$.type;
      let id = post.$.slug;
      let date = new Date(post.$.date);
      let author = post.$.tumblelog;
      let tag = post.$.type;
      let title, content;

      switch (postType) {
        case "regular":
          title = post["regular-title"][0];
          content = post["regular-body"][0];
          break;
        case "quote":
          title = post["quote-text"][0];
          content = post["quote-text"][0];
          break;
        case "conversation":
          title = post["conversation-title"][0];
          content = post["conversation-text"][0];
      }

      if (!allAuthors.find(existingAuthor => existingAuthor.id === author)) {
        allAuthors.push({
          id: author,
          name: author
        });
      }

      if (!allTags.find(existingTag => existingTag.id === tag)) {
        allTags.push({
          id: tag,
          name: tag
        });
      }


      let result = {
        id,
        title,
        authors: [author],
        date,
        tags: [tag],
        content
      };

      return result;
    })
    .compact()
    .value();

  return {
    tags: allTags,
    authors: allAuthors,
    content: allContent
  };
};
