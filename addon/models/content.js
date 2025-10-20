import Model, { attr, hasMany } from '@ember-data/model';

export default class ContentModel extends Model {
  @attr() title;
  @attr() canonical;
  @attr() content;
  @attr() excerpt;
  @attr() html;
  @attr() image;
  @attr() imageMeta;
  @attr('boolean') featured;
  @attr() status;
  @attr('date') date;
  @attr() meta;

  @attr() _primaryTagId;

  @hasMany('tag', { async: false }) tags;
  @hasMany('author', { async: false, inverse: 'posts' }) authors;

  get primaryTag() {
    return this.tags.find((t) => t.id === this._primaryTagId);
  }
}
