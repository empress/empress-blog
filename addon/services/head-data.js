import HeadData from 'ember-meta/services/head-data';
import { getOwner } from '@ember/application';
import config from 'ember-get-config';

import { getExcerpt, stripHTML } from '../helpers/excerpt';

const { blog } = config;

export default class HeadDataService extends HeadData {
  get config() {
    return config['blog'];
  }

  get currentRouteMeta() {
    let currentController = getOwner(this).lookup(`controller:${this.routeName}`)

    return currentController.model.post ?? currentController.model;
  }

  get title() {
    if(this.routeName === 'tag') {
      return `Tag: ${this.currentRouteMeta.name}`;
    }

    if(this.routeName === 'author') {
      return `Author: ${this.currentRouteMeta.name}`;
    }

    return super.title;
  }

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

  get slug() {
    return this.currentRouteMeta?.id;
  }

  get categories() {
    return this.currentRouteMeta?.tags?.mapBy('name');
  }

  get imgSrc() {
    let url = blog.host ? `${blog.host}` : '';

    url += this.currentRouteMeta.image || blog.rssLogo || blog.logo;

    return url;
  }

  get url() {
    if(!blog.host || !this.slug) { return null; }

    // we remove any trailing / from the host and add it back in to make sure
    // that we always have a consistent URL
    return `${blog.host.replace(/\/$/, '')}/${this.slug}/`;
  }
}
