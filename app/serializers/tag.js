/* eslint-disable prettier/prettier */
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalize() {
    let tag = this._super(...arguments);
    tag.data.attributes._postIds = tag.data.relationships.posts?.data.map(p => p.id) ?? [];
    return tag;
  }
});
