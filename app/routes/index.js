import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  classNames: ["index-template", "home-template"],
  store: service(),
  model() {
    return this.store.findAll('content').then((res) => {
      return res;
    });
  },
});
