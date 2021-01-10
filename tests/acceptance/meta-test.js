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
    assert.dom('head link[rel="canonical"]', document)
      .hasAttribute('href', 'https://empress-blog.netlify.com/');
    assert.dom('head meta[property="og:type"]', document)
      .hasAttribute('content', 'website');
    assert.dom('head meta[property="og:image"]', document)
      .hasAttribute('content', 'https://empress-blog.netlify.com/images/logo.png');
    assert.dom('head meta[property="og:site_name"]', document)
      .hasAttribute('content', 'empress-blog: The simple JAM stack blog');
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
    assert.dom('head meta[name="twitter:label2"]', document)
      .hasAttribute('content', 'Filed under');
    assert.dom('head meta[name="twitter:data2"]', document)
      .hasAttribute('content', 'Getting Started, Recent posts');
    assert.dom('head link[rel="canonical"]', document)
      .hasAttribute('href', 'https://empress-blog.netlify.com/welcome/');
    // I'm not testing the value of conent here to avoid timezone variations
    assert.dom('head meta[property="article:published_time"]', document)
      .hasAttribute('content');
    assert.dom('head meta[property="article:tag"]', document)
      .hasAttribute('content', 'Getting Started');
    assert.dom('head meta[property="og:type"]', document)
      .hasAttribute('content', 'article');
    assert.dom('head meta[property="og:image"]', document)
      .hasAttribute('content', 'https://empress-blog.netlify.com/images/welcome.jpg');

    await visit('/managing-users');

    assert.dom('head meta[property="og:title"]', document)
      .hasAttribute('content', 'Managing Ghost users');
    assert.dom('head meta[name="description"]', document)
      .hasAttribute('content', `empress-blog does not, and will never have the concept of user roles! This is because it is entirely a static system. You can assign authors to posts and generate new ones using...`);
    assert.dom('head meta[name="twitter:label1"]', document)
      .hasAttribute('content', 'Written by');
    assert.dom('head meta[name="twitter:data1"]', document)
      .hasAttribute('content', 'Chris Manson');
    assert.dom('head meta[name="twitter:label2"]', document)
      .hasAttribute('content', 'Filed under');
    assert.dom('head meta[name="twitter:data2"]', document)
      .hasAttribute('content', 'Getting Started, Recent posts');
    assert.dom('head link[rel="canonical"]', document)
      .hasAttribute('href', 'https://empress-blog.netlify.com/managing-users/');
    // I'm not testing the value of conent here to avoid timezone variations
    assert.dom('head meta[property="article:published_time"]', document)
      .hasAttribute('content');
    assert.dom('head meta[property="article:tag"]', document)
      .hasAttribute('content', 'Getting Started');
    assert.dom('head meta[property="og:type"]', document)
      .hasAttribute('content', 'article');
    assert.dom('head meta[property="og:image"]', document)
      .hasAttribute('content', 'https://empress-blog.netlify.com/images/team.jpg');
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
    assert.dom('head link[rel="canonical"]', document)
      .hasAttribute('href', 'https://empress-blog.netlify.com/page/chris-manson/');
    assert.dom('head meta[property="og:type"]', document)
      .hasAttribute('content', 'website');
    assert.dom('head meta[property="og:image"]', document)
      .hasAttribute('content', 'https://empress-blog.netlify.com/images/built-by.jpg');
  });

  test('author meta', async function(assert) {
    await visit('/author/ghost');

    assert.dom('head meta[property="og:title"]', document)
      .hasAttribute('content', 'Author: Ghost');
    assert.dom('head meta[name="description"]', document)
      .hasAttribute('content', 'You can delete this user to remove all the welcome posts');
    assert.dom('head link[rel="canonical"]', document)
      .hasAttribute('href', 'https://empress-blog.netlify.com/author/ghost/');
    assert.dom('head meta[property="og:type"]', document)
      .hasAttribute('content', 'website');
    assert.dom('head meta[property="og:image"]', document)
      .hasAttribute('content', 'https://empress-blog.netlify.com/images/ghost-icon.png');
  });

  test('tag meta', async function(assert) {
    await visit('/tag/getting-started');

    assert.dom('head meta[property="og:title"]', document)
      .hasAttribute('content', 'Tag: Getting Started');
    assert.dom('head meta[name="description"]', document)
      .hasAttribute('content', 'A description for the getting-started tag. If you delete this line it will say A collection of X posts where the description should go.');
    assert.dom('head link[rel="canonical"]', document)
      .hasAttribute('href', 'https://empress-blog.netlify.com/tag/getting-started/');
    assert.dom('head meta[property="og:type"]', document)
      .hasAttribute('content', 'website');
    assert.dom('head meta[property="og:image"]', document)
      .hasAttribute('content', 'https://empress-blog.netlify.com/images/logo.png');
  });
});
