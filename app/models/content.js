import DS from 'ember-data';
import { get, computed } from '@ember/object';

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
    return get(this, 'tags.firstObject');
  }),

  authors: DS.hasMany('author'),

  author: computed('authors.[]', function() {
    // eslint-disable-next-line no-console
    console.warn(`"author" is deprecated, you must define "authors" now. Content: ${this.title}`);
    return get(this, 'authors.firstObject');
  })
});
