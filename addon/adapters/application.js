/* eslint-disable ember/no-classic-classes, prettier/prettier, ember/require-computed-property-dependencies, ember/no-get */
import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default JSONAPIAdapter.extend({
  fastboot: service(),

  host: computed('fastboot.isFastBoot', function() {
    if (this.get('fastboot.isFastBoot')) {
      let protocol = this.get('fastboot.request.protocol');

      return `${protocol}//${this.get('fastboot.request.host')}`;
    } else {
      return window.location.origin;
    }
  }),

  ajaxOptions(url, type, options) {
    // remove the query params
    delete options.data;

    return this._super(url, type, options);
  },

  urlForFindAll(modelName) {
    return `${this.host}/${modelName}/${modelName}.json`;
  },

  urlForFindRecord(id, modelName) {
    return `${this.host}/${modelName}/${id}.json`;
  },

  // query is only ever used for pagination
  urlForQuery (query) {
    return `${this.host}${query.page}`;
  }
});
