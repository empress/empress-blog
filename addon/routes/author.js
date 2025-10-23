import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AuthorRoute extends Route {
  classNames = ['author-template'];

  @service
  store;

  async model(params) {
    // load content first for ember-data autopopulation - this is because author.posts is sync
    await this.store.findAll('content');
    const author = await this.store.peekRecord('author', params.id);

    // fix issue with downstream not being able to deal with the posts proxy
    return new Proxy(author, {
      get(target, prop) {
        if (prop === 'posts') {
          return target.posts.content;
        }

        return target[prop];
      },
    });
  }
}
