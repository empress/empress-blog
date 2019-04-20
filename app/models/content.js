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
  tags: DS.attr(),

  primaryTag: computed('tags.[]', function() {
    let tags = this.tags || [];
    return tags[0];
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
