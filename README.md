empress-blog
==============================================================================

> **Note:** if you have come here wanting to use empress-blog for your own blog then [skip down to the quick-start](#quick-start). You do **not** need to clone this repo to get started, you only need to clone this repo if you want to develop empress-blog 🎉

This project is designed to be a fully-functional, static site implementation of a blog system that is mostly compatible with [Ghost](https://ghost.org/) and is built on EmberJS with fully working out of the
box SEO friendly output. It supports being hosted on AWS S3 or any other static site
hosting solution.

This system supports the use of shallow forks of Ghost themes and currently supports

- [empress-blog Casper Template](https://github.com/empress/empress-blog-casper-template) which is a shallow fork of the official [Casper Template](https://github.com/TryGhost/Casper)
- [empress-blog Atilla Template](https://github.com/empress/empress-blog-attila-template) which is a shallow fork of [Atilla](https://github.com/zutrinken/attila)

If you are interested in writing your own theme for empress-blog please check out [create-empress-blog-template](https://github.com/empress/create-empress-blog-template#readme) which allows you to run `npm init empress-blog-template <name>` right now to get started (without the need to install anything). Check out the readme for more information.

If you want an example of the this "in production" then check out the [Stone Circle
Blog](https://blog.stonecircle.io).

You do not need to be a web developer to be able to use this system. You just write markdown files
and the rest of the work is performed by EmberJS' build system.

Super Quick Start
------------------------------------------------------------------------------
If you want to get your new empress-blog blog deployed on [Netlify](https://www.netlify.com/) in less than a minute then you can just click this button:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/empress/empress-blog-netlify-casper-template)

If you want to instead work with your blog locally before deploying then you can continue reading

Quick Start
------------------------------------------------------------------------------

```sh
npm init ember-app super-blog

cd super-blog

# you can replace the template with the one you want to use
npx ember install empress-blog empress-blog-casper-template
```

It will ask you if you want to update the `index.html` file and you should say yes 👍

If you want to see the blog system running on your local machine just run `npm start` and you will
be able to navigate to  [http://localhost:4200](http://localhost:4200) to see the blog in action.

**Note:** you need `npm@6.1` or later run this quick start. You can update with `npm install -g npm@latest` or check the [official docs](https://docs.npmjs.com/try-the-latest-stable-version-of-npm)

To build the static output directory, run the **standard** build process for a production Ember application:
```
npm run build -- -prod
```
This will generate a fully static output of your site in the `dist` folder.


Usage
------------------------------------------------------------------------------

### Creating Content

This addon comes with helpful blueprints to generate posts and authors for you in the structure it
expects. The first thing you should do is generate an author as follows:

```sh
npx ember g author your-name
```

Then you should be able to edit the file `author/your-name.md` to update the details.

Next you will want to generate some posts. If you only have one author generated (in a single user
blog) you can generate a post as simply as running:

```sh
npx ember g post "this is a post I want to write"
```

### Configuring

If you have already generated some content (see above) you will know that you are able to configure
certain details about your posts. If you want to edit the global configuration you will need to
provide a section in the Environment config file for your host Ember app (located in
`config/environment.js`). You will see a `let ENV = {` declaration near the top of the file, you
will need to add a `blog` key to that object with your configuration. Here is an example with the
exact contents of that `blog` config object from [the Stone Circle
blog](https://blog.stonecircle.io)

```javascript
let ENV = {

  // leave all the other config intact and add the following key

  blog: {
    title: "The Write Blog",
    description: "Here is where I lay my words",
    logo: "/images/logo-white.png",
    rssLogo: '/images/logo.png',
    coverImage: "/images/cover-image.jpg",
    coverMeta: {
      attribution: "by Conor Luddy",
      attributionLink: "https://unsplash.com/photos/QkQXTxJ7TLg"
    },
    twitter: "emberjs",
    navigation: [
      { label: 'Ember Consulting', link: 'https://simplabs.com' },
      { label: 'Blog Home', route: 'index' },
    ]
  },
}
```

This example config shows you how to set a title and general description for your blog, have a logo and a cover image, a link to your twitter account and how to add some navigation to your blog.

**Note:** the images like `/images/logo.png` will need to be in your `public` folder in your host app.

### Configuring your host & enabling RSS
The above configuration allows you to make your blog look a lot better but there is one piece of configuration that will enable some awesome features like automatically creating an RSS feed for you 🎉

Although because of the nature of some RSS aggregators you need to be *very* careful with this because it can mess up a cache that you have no control over, this is why it's dealt with differently than the above.

If you're not familiar with Ember configuration, you are able to specific some environment config *depending on what environment you are targeting*. This allows you to have some config only available in production (like Google Analytics for example).

If you go to the end of your `config/environment.js` file you will see something that is checking if the environment is `production`. You can add your host config to the blog config object as follows:

```javascript
if (environment === 'production') {

  // ... any other production config you might have ...

  ENV.blog.host = 'https://blog.stonecircle.io';
}
```

when ember-casper-template sees that you have host defined it will start generating the rss feed.

Custom Themes
------------------------------------------------------------------------------

If you are interested in writing your own theme for empress-blog you can get
started using

```bash
npm init empress-blog-template <template-name>
```

This will create a brand new template addon in the folder
`empress-blog-template-name-template`! This directory will contain a blank theme
based on the official [Ghost Starter Theme](https://github.com/TryGhost/Starter)
and is intended to be setup in such a way that anyone with HTML and CSS skills
can start developing their own themes without needing much knowledge of Ember 🎉

If you are new to ember and you feel like there is anything we can do to help
you get started please reach out to me [on Twitter](https://twitter.com/real_ate)
and I'd be happy to help you. You can check out the documentation for
[create-empress-blog-template here](https://github.com/empress/create-empress-blog-template#readme).

If you do end up writing an empress-blog template please let us know so I can
include your template in a list of existing templates.


Importing content
------------------------------------------------------------------------------

If you would like to import your blog content from another platform into
empress-blog we have a beta import function that we would love for people to try
out and give feedback. It requires that you create an export file from your
respective blog platform and then run the following command from the command
line:

```sh
npx ember empress-blog:import --type=[import_type] [dump_file]
```

Currently available `import_type`s are:
 - [Ghost](https://ghost.org/faq/the-importer/)
 - [WordPress](https://en.support.wordpress.com/export/)
 - [Tumblr](https://tumblr.zendesk.com/hc/en-us/articles/360005118894-Export-your-blog)

**Note:** When exporting a Tumblr blog you will be downloading a zip file which
you need to unpack. Once you unpack your export zip file you will find a
`posts.zip` file which also needs to be unpacked. Your `dump_file` will be the
resulting `posts.xml` file.


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
