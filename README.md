ember-ghost
==============================================================================

This project is designed to be a fully-functional, static site implementation of a blog system that is mostly compatible with [Ghost](https://ghost.org/) and is built on EmberJS with fully working out of the
box SEO friendly output. It supports being hosted on AWS S3 or any other static site
hosting solution.

This system supports the use of shallow forks of Ghost themes and currently supports

- [Ember Ghost Casper Template](https://github.com/empress/ember-ghost-casper-template) which is a shallow fork of the official [Casper Template](https://github.com/TryGhost/Casper)
- [Ember Ghost Atilla Template](https://github.com/empress/ember-ghost-attila-template) which is a shallow fork of [Atilla](https://github.com/zutrinken/attila)

If you are interested in writing your own theme for Ember Ghost please check out [create-ember-ghost-template](https://github.com/empress/create-ember-ghost-template#readme) which allows you to run `npm init ember-ghost-template <name>` right now to get started (without the need to install anything). Check out the readme for more information.

If you want an example of the this "in production" then check out the [Stone Circle
Blog](https://blog.stonecircle.io).

You do not need to be a web developer to be able to use this system. You just write markdown files
and the rest of the work is performed by EmberJS' build system.

Super Quick Start
------------------------------------------------------------------------------
If you want to get your new Ember-Ghost blog deployed on [Netlify](https://www.netlify.com/) in less than a minute then you can just click this button:

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/empress/ember-ghost-netlify-casper-template)

If you want to instead work with your blog locally before deploying then you can continue reading

Quick Start
------------------------------------------------------------------------------

```sh
# if you don't have ember-cli installed already
npm install -g ember-cli

ember new super-blog
cd super-blog

# you can replace the template with the one you want to use
ember install ember-ghost ember-ghost-casper-template
```

It will ask you if you want to update the `index.html` file and you should say yes 👍

To build the static output directory, run the **standard** build process for a production Ember application:
```
ember build -e production
```
This will generate a fully static output of your site in the `dist` folder.

If you want to see the blog system running on your local machine just run `npm start` and you will
be able to navigate to  [http://localhost:4200](http://localhost:4200) to see the blog in action.


Usage
------------------------------------------------------------------------------

### Creating Content

This addon comes with helpful blueprints to generate posts and authors for you in the structure it
expects. The first thing you should do is generate an author as follows:

```sh
ember g author your-name
```

Then you should be able to edit the file `author/your-name.md` to update the details.

Next you will want to generate some posts. If you only have one author generated (in a single user
blog) you can generate a post as simply as running:

```sh
ember g post "this is a post I want to write"
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

  // leave all the other config in tact and add the following key

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


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
