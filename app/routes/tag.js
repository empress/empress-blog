import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    // load content first for ember-data autopopulation
    return this.store.findAll('content').then(() => {
      return this.store.findRecord('tag', params.id)
    });
  },
});
