/* eslint-disable ember/use-ember-data-rfc-395-imports, ember/require-computed-macros, ember/no-get */
import DS from 'ember-data';
import { get, computed } from '@ember/object';

import { deprecate } from '@ember/application/deprecations';

export default DS.Model.extend({
  title: DS.attr('string'),
  canonical: DS.attr(),
  content: DS.attr('string'),
  excerpt: DS.attr(),
  html: DS.attr('string'),

  image: DS.attr('string'),
  imageMeta: DS.attr(),
  featured: DS.attr('boolean'),
  status: DS.attr('string'),
  date: DS.attr('date'),
  tags: DS.hasMany('tag'),

  primaryTag: computed('tags.[]', function() {
    return this.get('tags.firstObject')
  }),

  authors: DS.hasMany('author'),

  author: computed('authors.[]', function() {
    deprecate(`"author" is deprecated in the content model. You must use "authors" now in your templates.`, false, {
      id: 'empress-blog:content-model-author',
      until: '4.0.0',
    });
    return get(this, 'authors.firstObject');
  })
});
