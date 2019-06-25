import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  blog: service(),
  now: computed(function() {
    return new Date();
  })
})
