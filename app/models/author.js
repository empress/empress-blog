import Model, { attr, hasMany } from '@ember-data/model';

export default Model.extend({
  name: attr('string'),
  image: attr('string'),
  coverImage: attr('string'),
  coverMeta: attr(),
  content: attr('string'),
  html: attr(),
  website: attr('string'),
  twitter: attr('string'),
  facebook: attr('string'),
  location: attr('string'),

  posts: hasMany('content'),
});
