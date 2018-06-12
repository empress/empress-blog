'use strict';

module.exports = {
  name: 'ember-ghost'
};

'use strict';

const _ = require('lodash');
const MergeTrees = require('broccoli-merge-trees');
const StaticSiteJson = require('broccoli-static-site-json');
const StaticSiteJsonXml = require('broccoli-static-site-json-xml');
const walkSync = require('walk-sync');
const yamlFront = require('yaml-front-matter');

const { readFileSync } = require('fs');
const { join } = require('path');

const attributes = [
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
  'tags',
  'title',
  'uuid',
];

const references = ['author'];

function makeContentTree(contentFolder) {
  return new StaticSiteJson(contentFolder, {
    attributes,
    references,
    contentFolder,
    collections: [{
      src: contentFolder,
      output: `${contentFolder}.json`,
    }],
  });
}

const contentTree = makeContentTree('content');
const pageTree = makeContentTree('page');

const authorTree = new StaticSiteJson(`author`, {
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
  collections: [{
    src: 'author',
    output: 'author.json',
  }]
});

module.exports = {
  name: 'ember-casper-template',

  included(app) {
    this._super.included.apply(this, arguments)

    app.import('node_modules/downsize-cjs/index.js', {
      using: [
        { transformation: 'cjs', as: 'downsize'}
      ]
    });
  },

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
    const trees = [contentTree, pageTree, authorTree];

    const config = this.project.config(process.env.EMBER_ENV || 'development');

    if (config.blog && config.blog.host) {
      trees.push(new StaticSiteJsonXml(contentTree, {
        title: config.blog.title,
        host: config.blog.host,
        icon: config.blog.rssLogo || config.blog.logo,
      }));
    } else {
      if(this.ui) {
        this.ui.writeWarnLine(`Host is not configured so no RSS feed will be generated

          If you want know how to configure the host and other parameters check out our documentation:
          https://github.com/stonecircle/ember-casper-template`);
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
    const content = walkSync('content', {
      globs: ['*.md'],
    });

    const contentYamls = _.chain(content)
      .map(path => ({
        path,
        yaml: yamlFront.loadFront(readFileSync(join('content', path)))
      }))
      .value();

    const staticUrls = ['/'];

    const tagUrls = _.chain(contentYamls)
      .map(file => file.tags)
      .flatten()
      .uniq()
      .map(tag => `/tag/${tag}`)
      .value();

    const contentUrls = content.map(file => file.replace(/\.md$/, ''));

    const authorUrls = walkSync('author', {
      globs: ['*.md'],
    }).map(file => file.replace(/\.md$/, '')).map(file => `/author/${file}`);

    return [...staticUrls, ...contentUrls, ...authorUrls, ...tagUrls];
  },
};
