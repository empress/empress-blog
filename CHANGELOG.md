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
