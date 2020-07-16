'use strict';

const _ = require('lodash');
const MergeTrees = require('broccoli-merge-trees');
const StaticSiteJson = require('broccoli-static-site-json');
const StaticSiteJsonXml = require('broccoli-static-site-json-xml');
const Funnel = require('broccoli-funnel');
const walkSync = require('walk-sync');
const yamlFront = require('yaml-front-matter');

const { readFileSync, existsSync } = require('fs');
const { join } = require('path');

const AuthorsArray  = require('./lib/authors-array');
const TagGenerator  = require('./lib/tag-generator');
const ItemIncludePosts = require('./lib/item-include-posts');

module.exports = {
  name: require('./package').name,

  config(env, config) {
    let blog = config.blog || {};

    let emberMetaConfig = {
      description: blog.description,
      imgSrc: blog.rssLogo || blog.logo,
      siteName: blog.title,
      title: blog.title,
      twitterUsername: blog.twitter,

    }

    if(blog.host) {
      if(blog.host.endsWith('/')) {
        emberMetaConfig.url = `${blog.host}/`
      } else {
        emberMetaConfig.url = blog.host;
      }
    }

    return {
      'ember-meta': emberMetaConfig,
      blog: {},
      fastboot: {
        hostWhitelist: [/localhost:\d+/]
      },
    }
  },

  // isDevelopingAddon() {
  //   return true;
  // },

  treeForPublic() {
    const config = this.project.config(process.env.EMBER_ENV || 'development');

    const blogConfig = config.blog || {};

    let appPrefix = join(this.project.configPath(), '../..');

// TODO: once this is stable and added to documentation then we  should enable this warning
//     if(_.isNil(blogConfig.paginate)) {
//       this.ui.writeWarnLine(`You have not set paginate to 'true' or 'false' in your blog config. In the next major version of empress-blog this will default to true
//
// Please make sure that the current version of your template supports pagination before turning it on
// `);
//     }

    let contentFolder = join(appPrefix, 'content');

    // apply backwards-compatability shim for single author attribute
    contentFolder = new AuthorsArray(contentFolder);

    const contentTree = new StaticSiteJson(contentFolder, {
      type: 'content',
      attributes: [
        'canonical',
        'date',
        'excerpt',
        'featured',
        'image',
        'imageMeta',
        'language',
        'meta_description',
        'meta_title',
        'page',
        'status',
        'title',
        'uuid',
      ],
      references: ['authors', 'tags'],
      contentFolder: 'content',
      collate: true,
      collationFileName: 'content.json',
      paginate: blogConfig.paginate,
      paginateSortFunction(a, b) {
        return b.date - a.date;
      }
    });

    const pageTree = new StaticSiteJson(new AuthorsArray(join(appPrefix, 'page')), {
      type: 'page',
      attributes: [
        'canonical',
        'date',
        'featured',
        'image',
        'imageMeta',
        'language',
        'meta_description',
        'meta_title',
        'page',
        'status',
        'title',
        'uuid',
      ],
      references: ['authors', 'tags'],
      contentFolder: 'page',
      collate: true,
      collationFileName: 'page.json',
    });

    let authorFolder = join(appPrefix, 'author');

    // include the post IDs into authors
    authorFolder = new ItemIncludePosts(
      new MergeTrees([
        new Funnel(authorFolder, { destDir: 'author' }),
        new Funnel(contentFolder, { destDir: 'content' })
      ]), {
        itemType: 'author',
      }
    );

    const authorTree = new StaticSiteJson(authorFolder, {
      type: 'author',
      contentFolder: 'author',
      attributes: [
        'name',
        'image',
        'coverImage',
        'coverMeta',
        'bio',
        'website',
        'twitter',
        'facebook',
        'location',
      ],
      collate: true,
      collationFileName: 'author.json',
    });

    let tagFolder = join(appPrefix, 'tag');

    if(!existsSync(tagFolder)) {
      this.ui.writeWarnLine(`As of empress-blog@1.7 you must define your tags in the same way as you define your authors. We will auto generate tag files for you but this behaviour will be removed in empress-blog@2.0.

Please generate tags using 'ember generate tag your-tag-name'`);
      tagFolder = new TagGenerator(join(appPrefix, 'content'));
    } else {
      // make sure if you have defined a tag in a post that it exists
      let postTags = [];
      const markdownFiles = walkSync(join(appPrefix, 'content'))
        .filter(path => path.endsWith('.md'));

      markdownFiles.forEach((file) => {
        const fileContents = readFileSync(join(appPrefix, 'content', file))
        const frontMatter = yamlFront.loadFront(fileContents);

        postTags.push(frontMatter.tags);
      });

      postTags = _.chain(postTags)
        .flatten()
        .uniq()
        .value();

      const tags = walkSync(join(appPrefix, 'tag'))
        .filter(path => path.endsWith('.md'))
        .map(fileName => fileName.replace(/\.md$/, ''));

      postTags.forEach((tag) => {
        if(!_.includes(tags, tag)) {
          throw new Error(`You have defined a post with tag "${tag}" but there is no tag with that id. To create this tag run 'npx ember g tag ${tag}'`);
        }
      })
    }

    // include the post IDs into tags
    tagFolder = new ItemIncludePosts(
      new MergeTrees([
        new Funnel(tagFolder, { destDir: 'tag' }),
        new Funnel(contentFolder, { destDir: 'content' })
      ]), {
        itemType: 'tag',
      }
    );

    const tagTree = new StaticSiteJson(tagFolder, {
      type: 'tag',
      contentFolder: 'tag',
      attributes: [
        'name',
        'description',
        'image',
        'imageMeta',
      ],
      references: [{ name: 'posts', type: 'contents' }],
      collate: true,
      collationFileName: 'tag.json',
    });

    const trees = [contentTree, pageTree, authorTree, tagTree];

    if (blogConfig.host) {
      trees.push(new StaticSiteJsonXml(contentTree, {
        title: blogConfig.title,
        host: blogConfig.host,
        icon: blogConfig.rssLogo || blogConfig.logo,
      }));
    } else {
      if(this.ui) {
        this.ui.writeWarnLine(`Host is not configured so no RSS feed will be generated

          If you want know how to configure the host and other parameters check out our documentation:
          https://github.com/empress/empress-blog#configuring-your-host--enabling-rss`);
      }
    }

    return MergeTrees(trees);
  },

  contentFor(type, config) {
    if (type === 'head' && config.blog && config.blog.host) {
      return `<link rel="alternate" type="application/rss+xml" title="${config.blog.title}" href="${config.blog.host}/rss.xml" />`
    }
  },

  urlsForPrember() {
    let appPrefix = join(this.project.configPath(), '../..');

    const content = walkSync(join(appPrefix, 'content'), {
      globs: ['*.md'],
    });

    const contentYamls = _.chain(content)
      .map(path => ({
        path,
        yaml: yamlFront.loadFront(readFileSync(join(appPrefix, 'content', path)))
      }))
      .value();

    const staticUrls = ['/'];

    const tagUrls = _.chain(contentYamls)
      .map(file => file.yaml.tags)
      .flatten()
      .compact()
      .uniq()
      .map(tag => `/tag/${tag}`)
      .value();

    const contentUrls = content.map(file => file.replace(/\.md$/, ''));

    const pageUrls = walkSync(join(appPrefix, 'page'), {
      globs: ['*.md'],
    }).map(file => file.replace(/\.md$/, '')).map(file => `/page/${file}`);

    const authorUrls = walkSync(join(appPrefix, 'author'), {
      globs: ['*.md'],
    }).map(file => file.replace(/\.md$/, '')).map(file => `/author/${file}`);

    return [...staticUrls, ...contentUrls, ...authorUrls, ...pageUrls, ...tagUrls];
  },
};
