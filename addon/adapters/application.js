import DS from 'ember-data';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default DS.JSONAPIAdapter.extend({
  fastboot: service(),

  host: computed('fastboot.isFastBoot', function() {
    if (this.get('fastboot.isFastBoot')) {
      let protocol = this.get('fastboot.request.protocol');

      return `${protocol}//${this.get('fastboot.request.host')}`;
    } else {
      return window.location.origin;
    }
  }),

  urlForFindAll(modelName) {
    return `${this.host}/${modelName}/${modelName}.json`;
  },

  urlForFindRecord(id, modelName) {
    return `${this.host}/${modelName}/${id}.json`;
  },

  // query is only ever used for pagination
  urlForQuery (query) {
    return `${this.host}/${query.page}`;
  }
});
