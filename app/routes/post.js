import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  classNames: ["post-template"],

  model(params) {
    // load authors first for ember-data autopopulation
    return this.store.findAll('author').then(() => {
      return hash({
        post:  this.store.findRecord('content', params.id),
        posts: this.store.findAll('content'),
      });
    });
  },
});
