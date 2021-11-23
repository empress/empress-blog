import HeadData from 'ember-meta/services/head-data';
import { getOwner } from '@ember/application';
import { computed } from '@ember/object';
import config from 'ember-get-config';

import { getExcerpt, stripHTML } from '../helpers/excerpt';

const { blog } = config;

export default class HeadDataService extends HeadData {
  get config() {
    return config['blog'];
  }

  @computed('config.title')
  get siteName() {
    return this.config.title;
  }

  @computed('routeName')
  get currentController() {
    return getOwner(this).lookup(`controller:${this.routeName}`)
  }

  @computed('currentController.model.post')
  get currentRouteMeta() {
    return this.currentController.model.post ?? this.currentController.model;
  }

  @computed('currentRouteMeta.name', 'routeName')
  get title() {
    if(this.routeName === 'tag') {
      return `Tag: ${this.currentRouteMeta.name}`;
    }

    if(this.routeName === 'author') {
      return `Author: ${this.currentRouteMeta.name}`;
    }

    return super.title;
  }

  @computed('currentRouteMeta.authors.[]')
  get author() {
    return this.currentRouteMeta.authors?.firstObject;
  }

  @computed('currentRouteMeta')
  get description() {
    let currentModel = this.currentRouteMeta;

    if(currentModel && currentModel.html) {
      const excerpt = getExcerpt(currentModel.html, {
        words: 33
      })

      return `${excerpt}${excerpt.length !== stripHTML(currentModel.html).length ? '...' : ''}`;
    }

    return blog.description;
  }

  @computed('currentRouteMeta.id')
  get slug() {
    return this.currentRouteMeta?.id;
  }

  @computed('currentRouteMeta.tags')
  get categories() {
    return this.currentRouteMeta?.tags?.mapBy('name');
  }

  @computed('currentRouteMeta.image')
  get imgSrc() {
    let url = blog.host ? `${blog.host}` : '';

    url += this.currentRouteMeta.image || blog.rssLogo || blog.logo;

    return url;
  }

  @computed('router.currentURL')
  get url() {
    // url is only ever valid if you have a host
    if(!blog.host) {
      return null;
    }

    // we remove any trailing / from the host and add it back in to make sure
    // that we always have a consistent URL
    const normalisedHost = blog.host.replace(/\/$/, '');
    const normalisedUrl = this.router.currentURL.replace(/\/$/, '');

    return `${normalisedHost}${normalisedUrl}/`;
  }

  @computed('routeName')
  get type() {
    if(this.routeName === 'post') {
      return 'article';
    }

    return 'website';
  }
}
