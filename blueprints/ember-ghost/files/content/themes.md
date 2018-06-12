---
title: Setting up your own Ghost theme
image:
imageMeta:
  attribution:
  attributionLink:
featured: true
author: ghost
date: Tue Jun 12 2018 18:07:21 GMT+0100 (IST)
tags:
  - getting-started
---

Creating a totally custom design for your publication

Ghost comes with a beautiful default theme called Casper, which is designed to be a clean, readable publication layout and can be easily adapted for most purposes. However, Ghost can also be completely themed to suit your needs. Rather than just giving you a few basic settings which act as a poor proxy for code, we just let you write code.

There are a huge range of both free and premium pre-built themes which you can get from the [Ghost Theme Marketplace](http://marketplace.ghost.org), or you can simply create your own from scratch.

[![marketplace](https://casper.ghost.org/v1.0.0/images/marketplace.jpg)](http://marketplace.ghost.org)

> Anyone can write a completely custom Ghost theme, with just some solid knowledge of HTML and CSS

Ghost themes are written with a templating language called handlebars, which has a bunch of dynamic helpers to insert your data into template files. Like `{{author.name}}`, for example, outputs the name of the current author.

The best way to learn how to write your own Ghost theme is to have a look at [the source code for Casper](https://github.com/TryGhost/Casper), which is heavily commented and should give you a sense of how everything fits together.

- `default.hbs` is the main template file, all contexts will load inside this file unless specifically told to use a different template.
- `post.hbs` is the file used in the context of viewing a post.
- `index.hbs` is the file used in the context of viewing the home page.
- and so on

We've got [full and extensive theme documentation](http://themes.ghost.org/docs/about) which outlines every template file, context and helper that you can use.

If you want to chat with other people making Ghost themes to get any advice or help, there's also a **#themes** channel in our [public Slack community](https://slack.ghost.org) which we always recommend joining!
