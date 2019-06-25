import Controller from '@ember/controller';

import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  blog: service(),
  coverImage: computed('model.image', function() {
    return this.model.coverImage || this.blog.coverImage;
  })
})
