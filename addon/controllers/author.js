/* eslint-disable ember/no-classic-classes, prettier/prettier, ember/require-computed-macros, ember/require-computed-property-dependencies */
import Controller from '@ember/controller';

import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  blog: service(),
  coverImage: computed('model.image', function() {
    return this.model.coverImage || this.blog.coverImage;
  })
})
