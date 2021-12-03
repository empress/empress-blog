/* eslint-disable ember/no-classic-classes, prettier/prettier */
import Service from '@ember/service';
import { computed } from '@ember/object';

import config from 'ember-get-config';

export default Service.extend({
  prefix: computed(function() {
    let prefix = config.apiHost || '';

    if (prefix && config.apiNamespace) {
      prefix += `/${config.apiNamespace}`;
    } else if(prefix) {
      prefix += config.apiNamespace;
    }

    return prefix;
  })
});
