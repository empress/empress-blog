import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | meta test', function(hooks) {
  setupApplicationTest(hooks);

  test('index meta', async function(assert) {
    await visit('/');

    assert.dom('head meta[property="og:title"]', document)
      .hasAttribute('content', 'empress-blog: The simple JAM stack blog');
    assert.dom('head meta[name="description"]', document)
      .hasAttribute('content', 'Thoughts, stories and ideas.');
  });

  test('content meta', async function(assert) {
    await visit('/welcome');

    assert.dom('head meta[property="og:title"]', document)
      .hasAttribute('content', 'Welcome to empress-blog');
    assert.dom('head meta[name="description"]', document)
      .hasAttribute('content', `Hey! Welcome to empress-blog, it's great to have you :) We know that first impressions are important, so we've populated your new site with some initial Getting Started posts that will...`);
    assert.dom('head meta[name="twitter:label1"]', document)
      .hasAttribute('content', 'Written by');
    assert.dom('head meta[name="twitter:data1"]', document)
      .hasAttribute('content', 'Ghost');
  })

  test('page meta', async function(assert) {
    await visit('/page/chris-manson');

    assert.dom('head meta[property="og:title"]', document)
      .hasAttribute('content', 'Built with ❤️ by Chris Manson');
    assert.dom('head meta[name="description"]', document)
      .hasAttribute('content', `Chris Manson is a Ember enthusiast and a member of the Ember Core Learning Team. empress-blog was an experimental project that came out of the work on converting the Ember Guides to...`);
    assert.dom('head meta[name="twitter:label1"]', document)
      .hasAttribute('content', 'Written by');
    assert.dom('head meta[name="twitter:data1"]', document)
      .hasAttribute('content', 'Chris Manson');
  });

  test('author meta', async function(assert) {
    await visit('/author/ghost');

    assert.dom('head meta[property="og:title"]', document)
      .hasAttribute('content', 'Author: Ghost');
    assert.dom('head meta[name="description"]', document)
      .hasAttribute('content', 'You can delete this user to remove all the welcome posts');
  });

  test('tag meta', async function(assert) {
    await visit('/tag/getting-started');

    assert.dom('head meta[property="og:title"]', document)
      .hasAttribute('content', 'Tag: Getting Started');
    assert.dom('head meta[name="description"]', document)
      .hasAttribute('content', 'A description for the getting-started tag. If you delete this line it will say A collection of X posts where the description should go.');
  });
});
