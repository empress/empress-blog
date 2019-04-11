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

    if(_.isNil(blogConfig.paginate)) {
      this.ui.writeWarnLine(`You have not set paginate to 'true' or 'false' in your blog config. In the next major version of empress-blog this will default to true

Please make sure that the current version of your template supports pagination before turning it on
`);
    }

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
      collate: true,
      collationFileName: 'content.json',
      paginate: blogConfig.paginate,
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
      collate: true,
      collationFileName: 'page.json',
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
      collate: true,
      collationFileName: 'author.json',
    });

    const trees = [contentTree, pageTree, authorTree];

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

    const authorUrls = walkSync(join(appPrefix, 'author'), {
      globs: ['*.md'],
    }).map(file => file.replace(/\.md$/, '')).map(file => `/author/${file}`);

    return [...staticUrls, ...contentUrls, ...authorUrls, ...tagUrls];
  },
};
