/* eslint-disable prettier/prettier, ember/no-classic-classes */
import Service from '@ember/service';
import { computed, get } from '@ember/object';

import config from 'ember-get-config';

function configParam(param) {
  return computed(function() {
    return get(config, `blog.${param}`);
  })
}

export default Service.extend({
  title: configParam('title'),
  description: configParam('description'),
  logo: configParam('logo'),
  coverImage: configParam('coverImage'),
  coverMeta: configParam('coverMeta'),
  navigation: configParam('navigation'),
  twitter: configParam('twitter'),
  facebook: configParam('facebook'),
  host: configParam('host'),
  paginate: configParam('paginate'),
});
