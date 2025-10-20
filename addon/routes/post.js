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

    let author;

    if (post.authors.lenght === 1) {
      author = post.authors[0];
    }

    return {
      author,
      post,
      posts,
    };
  }
}
