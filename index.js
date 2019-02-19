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

const AuthorsArray  = require('./lib/authors-array');

module.exports = {
  name: 'ember-ghost',

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

  isDevelopingAddon() {
    return true;
  },

  treeForPublic() {
    let appPrefix = join(this.project.configPath(), '../..');

    const contentTree = new StaticSiteJson(new AuthorsArray(join(appPrefix, 'content')), {
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
        'tags',
        'title',
        'uuid',
      ],
      references: ['authors'],
      contentFolder: 'content',
      collections: [{
        src: join(appPrefix, 'content'),
        output: `content.json`,
      }],
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
        'tags',
        'title',
        'uuid',
      ],
      references: ['authors'],
      contentFolder: 'page',
      collections: [{
        src: join(appPrefix, 'page'),
        output: 'page.json',
      }],
    });

    const authorTree = new StaticSiteJson(join(appPrefix, 'author'), {
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
      collections: [{
        src: join(appPrefix, 'author'),
        output: 'author.json',
      }]
    });

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
          https://github.com/empress/ember-ghost#configuring-your-host--enabling-rss`);
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

    const authorUrls = walkSync(join(appPrefix, 'author'), {
      globs: ['*.md'],
    }).map(file => file.replace(/\.md$/, '')).map(file => `/author/${file}`);

    return [...staticUrls, ...contentUrls, ...authorUrls, ...tagUrls];
  },
};
