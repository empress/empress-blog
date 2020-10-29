import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalize() {
    let content = this._super(...arguments);
    content.data.relationships.primaryTag = {
      data: content.data.relationships.tags?.data[0]
    };
    return content;
  }
});
