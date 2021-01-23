import Model, { attr, hasMany } from '@ember-data/model';

export default class TagModel extends Model {
  @attr() name;
  @attr() image;
  @attr() imageMeta;
  @attr() content;
  @attr() html;
  @attr() meta;

  // workaround for unstable ember-data relationship id sorting
  // see: https://discuss.emberjs.com/t/manual-pagination-in-ember-data-relationships/18087
  @attr() _postIds;

  @hasMany('content') posts;
}
