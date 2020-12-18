/* eslint-disable ember/require-computed-macros, ember/no-get */
import Model, { attr, hasMany } from '@ember-data/model';
import { get, computed } from '@ember/object';

import { deprecate } from '@ember/application/deprecations';

export default Model.extend({
  title: attr('string'),
  canonical: attr(),
  content: attr('string'),
  excerpt: attr(),
  html: attr('string'),

  image: attr('string'),
  imageMeta: attr(),
  featured: attr('boolean'),
  status: attr('string'),
  date: attr('date'),
  tags: hasMany('tag'),

  _primaryTagId: attr(),
  primaryTag: computed('tags.[]', '_primaryTagId', function() {
    return this.get('tags').findBy('id', this.get('_primaryTagId'));
  }),

  authors: hasMany('author'),

  author: computed('authors.[]', function() {
    deprecate(`"author" is deprecated in the content model. You must use "authors" now in your templates.`, false, {
      id: 'empress-blog:content-model-author',
      until: '4.0.0',
    });
    return get(this, 'authors.firstObject');
  })
});
