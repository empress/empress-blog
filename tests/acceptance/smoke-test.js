/* eslint-disable prettier/prettier */
import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | smoke test', function(hooks) {
  setupApplicationTest(hooks);

  test('navigate to all routes', async function(assert) {
    await visit('/');
    assert.equal(currentURL(), '/');
    // test og:title because testem replaces the actual title :(
    assert.dom('head meta[property="og:title"]', document).hasAttribute('content', 'empress-blog: The simple JAM stack blog');

    await click('.post-card-content-link');
    assert.equal(currentURL(), '/welcome');
    assert.dom('head meta[property="og:title"]', document).hasAttribute('content', 'Welcome to empress-blog');

    await click('.nav .nav-Built a');
    assert.equal(currentURL(), '/page/chris-manson');
    assert.dom('head meta[property="og:title"]', document).hasAttribute('content', 'Built with ❤️ by Chris Manson');

    await click('.nav .nav-Home a');
    await click('.static-avatar');
    assert.equal(currentURL(), '/author/ghost');
    assert.dom('head meta[property="og:title"]', document).hasAttribute('content', 'Author: Ghost');

    await click('.post-card-image-link');
    await click('.post-full-header a');
    assert.equal(currentURL(), '/tag/getting-started');
    assert.dom('head meta[property="og:title"]', document).hasAttribute('content', 'Tag: Getting Started');
  });
});
