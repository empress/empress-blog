/* eslint-disable prettier/prettier */
import Model, { attr, hasMany } from '@ember-data/model';
import { deprecate } from '@ember/debug';

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

  @hasMany('tag') tags;
  @hasMany('author') authors;

  get primaryTag() {
    return this.tags.findBy('id', this._primaryTagId);
  }

  get author () {
    deprecate(`"author" is deprecated in the content model. You must use "authors" now in your templates.`, false, {
      id: 'empress-blog:content-model-author',
      until: '4.0.0',
    });
    return this.authors.firstObject;
  }
}
