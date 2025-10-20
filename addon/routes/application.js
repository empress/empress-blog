/* eslint-disable ember/no-classic-classes */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import '@warp-drive/ember/install';

export default Route.extend({
  store: service(),

  model() {
    return RSVP.hash({
      authors: this.store.findAll('author'),
      tags: this.store.findAll('tag'),
    });
  },
});
