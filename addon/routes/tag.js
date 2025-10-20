/* eslint-disable ember/no-classic-classes, prettier/prettier */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { getTag } from '../builders/posts';

export default Route.extend({
  classNames: ["tag-template"],

  store: service(),

  model(params) {
    // load content first for ember-data autopopulation
    return this.store.findAll('content').then(() => {
      return this.store.findRecord('tag', params.id)
    });
    const { content: {data: tag} } = await this.store.request(getTag(params.id));
  },
});
