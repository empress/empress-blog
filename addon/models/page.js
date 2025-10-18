import ContentModel from './content';
import { hasMany } from '@ember-data/model';

export default class PageModel extends ContentModel {
  @hasMany('tag', { async: false, inverse: null }) tags;
  @hasMany('author', { async: false, inverse: null }) authors;
}
