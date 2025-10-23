# Changelog

## Release (2025-10-23)

* empress-blog 5.0.1 (patch)

#### :bug: Bug Fix
* `empress-blog`
  * [#199](https://github.com/empress/empress-blog/pull/199) update npm on publish job ([@mansona](https://github.com/mansona))

#### Committers: 1
- Chris Manson ([@mansona](https://github.com/mansona))

## Release (2025-10-23)

* empress-blog 5.0.0 (major)

#### :boom: Breaking Change
* `empress-blog`
  * [#196](https://github.com/empress/empress-blog/pull/196) drop ember-cli-showdown dependency ([@mansona](https://github.com/mansona))
  * [#195](https://github.com/empress/empress-blog/pull/195) Drop support for Ember < 3.28 ([@mansona](https://github.com/mansona))
  * [#193](https://github.com/empress/empress-blog/pull/193) swap to pnpm and drop support for node < 20 ([@mansona](https://github.com/mansona))
  * [#177](https://github.com/empress/empress-blog/pull/177) Breaking: drop support for Node < 16 ([@mansona](https://github.com/mansona))

#### :rocket: Enhancement
* `empress-blog`
  * [#197](https://github.com/empress/empress-blog/pull/197) update dependencies ([@mansona](https://github.com/mansona))
  * [#180](https://github.com/empress/empress-blog/pull/180) update all dependencies ([@mansona](https://github.com/mansona))

#### :house: Internal
* `empress-blog`
  * [#198](https://github.com/empress/empress-blog/pull/198) prepare to release with OIDC ([@mansona](https://github.com/mansona))
  * [#194](https://github.com/empress/empress-blog/pull/194) Update to 5.12 with ember-cli-update ([@mansona](https://github.com/mansona))
  * [#184](https://github.com/empress/empress-blog/pull/184) setup release-plan ([@mansona](https://github.com/mansona))
  * [#179](https://github.com/empress/empress-blog/pull/179) update to v4.12 with ember-cli-update ([@mansona](https://github.com/mansona))
  * [#178](https://github.com/empress/empress-blog/pull/178) Update to 4.8 with ember-cli-update ([@mansona](https://github.com/mansona))
  * [#176](https://github.com/empress/empress-blog/pull/176) Update ember to v4.4 with ember-cli-update ([@mansona](https://github.com/mansona))
  * [#157](https://github.com/empress/empress-blog/pull/157) [DOC] - fix some readme typos ([@sbatson5](https://github.com/sbatson5))

#### Committers: 2
- Chris Manson ([@mansona](https://github.com/mansona))
- Scott Batson ([@sbatson5](https://github.com/sbatson5))

4.1.0 / 2022-01-09
==================

  * make sure prember urls are prefixed with a / #145 from @mansona

4.0.0 / 2021-12-06
==================

  * Drop support for Ember < 3.16 and update with ember-cli-update #147 from @mansona
  * update ember-body-class #150 from @mansona
  * Drop support for Node 10 and update github action to be more like blueprint #146 from @mansona

This version adds support for Ember 4.0 🎉

3.4.0 / 2021-09-09
==================

  * Allow Arbitrary Metadata for All Content #142 from @mansona
  * update models to classes #141 from @mansona
  * add ember-try scenarios for deprecations #139 from @mansona
  * add a test with latest ember and ember-data #134 from @mansona

3.3.0 / 2021-08-26
==================

  * fix htmlSafe import #133 from @mansona
  * add `node: current` to targets on install of empress-blog #132 from @mansona

3.2.1 / 2021-08-25
==================

  * cleanup github ci #131 from @mansona
  * Fix import of htmlsafe #128 from @bracke
  * update lint-to-the-future #127 from @mansona

3.2.0 / 2021-04-27
==================

  * Add Import scripts for Ghost, WordPress, and Tumblr #42 from @mansona
  * Move blog and url services to addon folder #118 from @jelhan
  * remove duplicate header from post blueprint #117 from @mansona
  * Use actual local image embed when mentioned in guide content #111 from @elwayman02

3.1.0 / 2021-03-03
==================

  * Add Page Blueprint #104 from @elwayman02
  * [internal] move from travis to github ci #110 from @mansona
  * fix page title/meta not updating correctly when only the model changes #102 from @nickschot
  * [internal] fix some of the ember/use-ember-data-rfc-395-imports ignored rules #100 from @mansona

3.0.1 / 2020-12-04
==================

  * Add tests for metadata and fix anything that is obviously wrong #99 from @mansona

3.0.0 / 2020-11-26
==================

This is a breaking change because we drop support for Ember 3.4 in this release.

  * BREAKING: replace naive scroll to top implementation with ember-scroll #97 from @nickschot

2.3.1 / 2020-11-12
==================

  * add support for posts without tags #95 from @nickschot
  * use a separate _primaryTagId attribute to get the correct primaryTag #94 from @nickschot
  * fix: update Tag serializer to use _postIds instead of postIds #93 from @nickschot

2.3.0 / 2020-11-11
==================

  * add stable array of post IDs to the tag model #88 from @nickschot
  * update with ember-cli-update #90 from @mansona
  * add basic smoke-test #91 from @mansona

2.2.1 / 2020-11-01
==================

  * Revert "replace naive scroll to top implementation with ember-scroll" #92 from @mansona

2.2.0 / 2020-10-29
==================

  * replace naive scroll to top implementation with ember-scroll #87 from @nickschot

2.1.0 / 2020-10-08
==================

  * fix sorting in paginated content #86 from @mansona
  * remove new tag from newly generated posts #82 from @mansona
  * adds support for automatic new tags for 4 most recent posts #79 from @jaredgalanis
  * update ember-responsive-image #80 from @mansona
  * run lighthouse on CI #78 from @mansona

2.0.0 / 2020-09-03
==================

  * swap `sh` with `bash` for default content code blocks to support Prism #74 from @nickschot
  * BREAKING: remove duplicate helpers & dependencies #72 from @nickschot

1.9.0 / 2020-07-23
==================

  * automatically include post ids in authors as relationships #70 from @mansona

1.8.3 / 2020-07-13
==================

  * use empress-blueprint-helpers for config writing #68 from @mansona

1.8.2 / 2020-06-15
==================

  * bump casper-template dev dependency #65 from @mansona
  * Remove broken links from Readme #64 from @mansona
  * Fix wrong spelling of Attila #60 from @bracke

1.8.1 / 2020-05-25
==================

  * fix references when tags have no posts #62 from @mansona

1.8.0 / 2020-05-24
==================

  * automatically include post ids in tags as relationships #61 from @mansona
  * update broccoli-static-site-json #61 from @mansona

1.7.3 / 2020-03-27
==================

  * Add Page Urls to Prember #54 from @devotox

1.7.2 / 2019-07-29
==================

  * fixing infinite loop because of missing tag from @mansona

1.7.1 / 2019-05-07
==================

  * bumping empress-blog-casper-template for the demo from @mansona

1.7.0 / 2019-05-07
==================

  * Dependency updates and minor changes ahead of a release #33
  * adding a second author example for the blueprints #33 from @mansona
  * adding TagGenerator broccoli plugin for backwards compatibility #32
  * fixing coverImage for authors and tags #32
  * Make tags a first-class citizen #32 from @amyrlam

1.6.1 / 2019-04-20
==================

  * turning content.author deprecation into a real deprecation from @mansona

1.6.0 / 2019-04-17
==================

  * updating using ember-cli-update #28 from @mansona
  * use findAll and find for data instead of query to improve caching #28 from @mansona
  * adding pagination experiment (opt in for now and unstable) #28 from @mansona

1.5.2 / 2019-04-16
==================

  * fix domain -> host

1.5.1 / 2019-04-16
==================

  * fix urls in ember-meta

1.5.0 / 2019-04-01
==================

  * add date, plural and route-is helpers for theme development #21 from @mansona
  * correct spelling error, satic -> static #20 from @jenweber

1.4.2 / 2019-03-12
==================

  * fixing default blueprint names #18 from @mansona
  * fixing authors deprecation #18 from @mansona

1.4.1 / 2019-03-12
==================

  * converting from ember-ghost to empress-blog #17 from @mansona


1.4.0 / 2019-02-19
==================

  * Add support for multiple authors on posts and deprecate single authors #15 from @amyrlam

1.3.0 / 2019-01-15
==================

  * Add `excerpt` to post model #14 from @amyrlam

1.2.0 / 2018-11-25
==================

  * using ember-auto-import instead of ember-cli-cjs-transform #10 from @mansona
  * improving the blueprint to work more effectively with addons #10 from @mansona
  * moving application adapter to addon folder so it can be imported and expanded in consuming app #10 from @mansona
