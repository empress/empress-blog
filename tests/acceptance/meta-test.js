import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | meta test', function(hooks) {
  setupApplicationTest(hooks);

  test('index meta', async function(assert) {
    await visit('/');

    assert.dom('head meta[property="og:title"]', document)
      .hasAttribute('content', 'empress-blog: The simple JAM stack blog');
  });

  test('content meta', async function(assert) {
    await visit('/welcome');

    assert.dom('head meta[property="og:title"]', document)
      .hasAttribute('content', 'Welcome to empress-blog');
    assert.dom('head meta[name="twitter:label1"]', document)
      .hasAttribute('content', 'Written by');
    assert.dom('head meta[name="twitter:data1"]', document)
      .hasAttribute('content', 'Ghost');
  })

  test('page meta', async function(assert) {
    await visit('/page/chris-manson');

    assert.dom('head meta[property="og:title"]', document)
      .hasAttribute('content', 'Built with ❤️ by Chris Manson');
    assert.dom('head meta[name="twitter:label1"]', document)
      .hasAttribute('content', 'Written by');
    assert.dom('head meta[name="twitter:data1"]', document)
      .hasAttribute('content', 'Chris Manson');
  });

  test('author meta', async function(assert) {
    await visit('/author/ghost');

    assert.dom('head meta[property="og:title"]', document)
      .hasAttribute('content', 'Author: Ghost');
  });

  test('tag meta', async function(assert) {
    await visit('/tag/getting-started');

    assert.dom('head meta[property="og:title"]', document)
      .hasAttribute('content', 'Tag: Getting Started');
  });
});
