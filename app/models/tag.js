/* eslint-disable ember/use-ember-data-rfc-395-imports */
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  image: DS.attr('string'),
  imageMeta: DS.attr(),
  content: DS.attr('string'),

  posts: DS.hasMany('content', { inverse: 'tags' }),
});
