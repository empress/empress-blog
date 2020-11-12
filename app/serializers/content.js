import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalize() {
    let content = this._super(...arguments);
    content.data.attributes._primaryTagId = content.data.relationships.tags?.data[0]?.id
    return content;
  }
});
