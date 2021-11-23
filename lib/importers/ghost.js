/* eslint-disable prettier/prettier */
const _ = require('lodash');

module.exports = async function ghostImport(fileContents) {

  const data = await JSON.parse(fileContents).db[0].data;

  let authorMap = {};

  let authors = data.users.map((author) => {
    authorMap[author.id] = author.slug;

    return {
      id: author.slug,
      name: author.name || '',
      image: author.profile_image || '',
      coverImage: author.cover_image || '',
      website: author.website || '',
      twitter: author.twitter || '',
      facebook: author.facebook || '',
      location: author.location || '',
      bio: author.bio || '',
    }
  })

  let tagMap = {};

  let tags = data.tags.map((tag) => {
    tagMap[tag.id] = tag.slug;

    return {
      id: tag.slug,
      name: tag.name,
      image: tag.feature_image || '',
      description: tag.description || ''
    }
  });

  let content = _.chain(data.posts)
    .map((post) => {
      // console.log(post);

      // don't import draft posts
      if(post.status !== 'published') {
        return;
      }

      let result = {
        id: post.slug,
        title: post.title || '',
        image: post.feature_image || '',
        date: post.created_at,
        content: post.plaintext,
        tags: _.chain(data.posts_tags)
          .filter(item => item.post_id === post.id)
          .map(item => tagMap[item.tag_id])
          .value(),
        authors: _.chain(data.posts_authors)
          .filter(item => item.post_id === post.id)
          .map(item => authorMap[item.author_id])
          .value(),
      }

      return result;
    })
    .compact()
    .value();

  return {
    tags,
    authors,
    content,
  }
}
