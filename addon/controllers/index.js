/* eslint-disable ember/no-classic-classes, prettier/prettier, ember/require-computed-property-dependencies, ember/no-get */
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

import { get, computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default Controller.extend({
  blog: service(),
  url: service(),

  queryParams: Object.freeze(['page']),
  page: '/content/content-0.json',

  coverImageStyle: computed('blog.coverImage', function() {
    return htmlSafe(`background-image: url(${get(this, 'url.prefix')}${get(this, 'blog.coverImage')})`);
  }),

  pageNumber: computed('page', function() {
    let page = parseInt(this.page.match(/content\/content-(.*).json/)[1]);
    return page + 1;
  }),

  numerOfPages: computed('model.links.last', function() {
    let pages = parseInt(this.model.links.last.match(/content\/content-(.*).json/)[1]);
    return pages + 1;
  })
})
