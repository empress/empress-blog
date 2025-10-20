import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TagRoute extends Route {
  classNames = ['tag-template'];

  @service
  store;

  async model(params) {
    // load content first for ember-data autopopulation
    await this.store.findAll('content');

    return this.store.peekRecord('tag', params.id);
  }
}
