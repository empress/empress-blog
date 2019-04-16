import HeadData from 'ember-meta/services/head-data';
import { computed, get } from '@ember/object';
import { getOwner } from '@ember/application';
import config from 'ember-get-config';

import { getExcerpt } from '../helpers/excerpt';

const { blog } = config;

export default HeadData.extend({
  author: computed('routeName', function() {
    return this.get('currentRouteModel.author.name');
  }),

  currentRouteModel: computed('routeName', function() {
    return getOwner(this).lookup(`route:${this.get('routeName')}`).get('currentModel.post');
  }),

  description: computed('routeName', function() {
    let currentModel = this.get('currentRouteModel');

    if(currentModel && get(currentModel, 'html')) {
      const excerpt = getExcerpt(get(currentModel, 'html'), {
        words: 33
      })
      return `${excerpt}...`;
    }

    return blog.description;
  }),

  slug: computed('routeName', function() {
    return this.get('currentRouteModel.id');
  }),

  categories: computed('routeName', function() {
    return this.get('currentRouteModel.tags');
  }),

  imgSrc: computed('routeName', function() {
    let url = blog.domain ? `${blog.domain}` : '';

    url += this.currentRouteModel.image || blog.rssLogo || blog.logo;

    return url;
  }),

  url: computed('routeName', function() {
    if(!blog.domain || !this.slug) { return; }

    return `${blog.domain}/${this.slug}/`;
  })
});
