const { promisify } = require("util");
const { parseString } = require("xml2js");
const _ = require("lodash");

const parse = promisify(parseString);

module.exports = async function tumblrImport(fileContents) {
  const data = await parse(fileContents);

  let channel = data.tumblr.posts[0];

  let authors = [];
  let tags = [];

  let content = _.chain(channel.post)
    .map(post => {
      let postType = post.$.type;
      let id = post.$.id;
      let date = new Date(post.$.date);
      let author = post.$.tumblelog;
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
      }

      if (!authors.find(existingAuthor => existingAuthor.id === author)) {
        authors.push({
          id: author,
          name: author
        });
      }

      let result = {
        id,
        title,
        authors,
        date,
        tags,
        content
      };

      return result;
    })
    .compact()
    .value();

  return {
    tags,
    authors,
    content
  };
};
