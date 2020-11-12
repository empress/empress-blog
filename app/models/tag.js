/* eslint-disable ember/use-ember-data-rfc-395-imports */
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  image: DS.attr('string'),
  imageMeta: DS.attr(),
  content: DS.attr('string'),

  // workaround for unstable ember-data relationship id sorting
  // see: https://discuss.emberjs.com/t/manual-pagination-in-ember-data-relationships/18087
  _postIds: DS.attr(),

  posts: DS.hasMany('content', { inverse: 'tags' }),
});
