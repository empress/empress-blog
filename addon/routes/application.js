import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model() {
    return RSVP.hash({
      authors: this.store.findAll('author'),
      tags: this.store.findAll('tag'),
    });
  },
});
