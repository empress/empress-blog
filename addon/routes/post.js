import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class PostRoute extends Route {
  classNames = ['post-template'];

  @service
  store;

  async model(params) {
    const [post, posts] = await Promise.all([
      this.store.findRecord('content', params.id),
      this.store.findAll('content'),
    ]);

    return {
      post,
      posts,
    };
  }
}
