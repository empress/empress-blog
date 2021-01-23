import Model, { attr, hasMany } from '@ember-data/model';

export default class AuthorModel extends Model {
  @attr() name;
  @attr() image;
  @attr() coverImage;
  @attr() coverMeta;
  @attr() content;
  @attr() html;
  @attr() website;
  @attr() twitter;
  @attr() facebook;
  @attr() location;
  @attr() meta;

  @hasMany('content') posts;
}
