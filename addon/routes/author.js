/* eslint-disable ember/no-classic-classes, prettier/prettier */
import Route from '@ember/routing/route';

export default Route.extend({
  classNames: ["author-template"],
  model(params) {
    // load content first for ember-data autopopulation
    return this.store.findAll('content').then(() => {
      return this.store.findRecord('author', params.id)
    });
  },
});
