import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | smoke test', function(hooks) {
  setupApplicationTest(hooks);

  test('navigate to all routes', async function(assert) {
    await visit('/');
    assert.equal(currentURL(), '/');

    await click('.post-card-content-link');
    assert.equal(currentURL(), '/welcome');

    await click('.nav .nav-Built a');
    assert.equal(currentURL(), '/page/chris-manson');

    await click('.nav .nav-Home a');
    await click('.static-avatar');
    assert.equal(currentURL(), '/author/ghost');

    await click('.post-card-image-link');
    await click('.post-full-header a');
    assert.equal(currentURL(), '/tag/getting-started');
  });
});
