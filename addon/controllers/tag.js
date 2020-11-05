/* eslint-disable ember/require-computed-macros */
import Controller from '@ember/controller';

import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  blog: service(),
  coverImage: computed('model.image', 'blog.coverImage', function() {
    return this.model.image || this.blog.coverImage;
  })
})
