import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import { observer } from '@ember/object';

export default Helper.extend({
  router: service(),
  onNewRoute: observer('router.currentRouteName', function() {
    this.recompute();
  }),
  compute([route]) {
    return route === this.router.currentRouteName;
  },
});
