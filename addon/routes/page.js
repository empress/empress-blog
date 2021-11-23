/* eslint-disable ember/no-classic-classes, prettier/prettier */
import Route from '@ember/routing/route';

export default Route.extend({
  classNames: ["page-template"],
  model(params) {
    return this.store.findRecord('page', params.id);
  },
});
