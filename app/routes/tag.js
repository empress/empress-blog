import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { get } from '@ember/object';

export default Route.extend({
  model(params) {
    return hash({
      tag: params.id,
      posts: this.store.findAll('content').then((posts) => posts.filter((post) => {
        if (get(post, 'tags')) {
          return get(post, 'tags').includes(params.id);
        }
      }))
    })
  }
});
