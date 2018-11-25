import DS from 'ember-data';

import { apiHost, apiNamespace} from 'ember-get-config';

export default DS.JSONAPIAdapter.extend({
  buildURL(modelName, id, snapshot, requestType, query) {
    let prefix = apiHost || '';

    if (prefix && apiNamespace) {
      prefix += `/${apiNamespace}`;
    } else if(prefix) {
      prefix += apiNamespace;
    }

    if (requestType === 'queryRecord') {
      return `${prefix}/${modelName}/${query.path}.json`;
    } else if (requestType === 'query') {
      return `${prefix}/${modelName}/${query.path}.json`;
    } else if (requestType === 'findRecord') {
      return `${prefix}/${modelName}/${id}.json`;
    }

    return this._super(...arguments);
  },
});
