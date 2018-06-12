---
title: Organising your content with tags
image: /images/tags.jpg
imageMeta:
  attribution:
  attributionLink:
featured: true
author: ghost
date: Tue Jun 12 2018 17:58:10 GMT+0100 (IST)
tags:
  - getting-started
---

Ghost has a single, powerful organisational taxonomy, called tags.

It doesn't matter whether you want to call them categories, tags, boxes, or anything else. You can think of Ghost tags a lot like Gmail labels. By tagging posts with one or more keyword, you can organise articles into buckets of related content.


## Basic tagging

When you write a post, you can assign tags to help differentiate between categories of content. For example, you might tag some posts with `News` and other posts with `Cycling`, which would create two distinct categories of content listed on `/tag/news/` and `/tag/cycling/`, respectively.

If you tag a post with both `News` *and* `Cycling` - then it appears in both sections.

Tag archives are like dedicated home-pages for each category of content that you have. They have their own pages, their own RSS feeds, and can support their own cover images and meta data.


## The primary tag

Inside the Ghost editor, you can drag and drop tags into a specific order. The first tag in the list is always given the most importance, and some themes will only display the primary tag (the first tag in the list) by default. So you can add the most important tag which you want to show up in your theme, but also add a bunch of related tags which are less important.

==**News**, Cycling, Bart Stevens, Extreme Sports==

In this example, **News** is the primary tag which will be displayed by the theme, but the post will also still receive all the other tags, and show up in their respective archives.


## Private tags

Sometimes you may want to assign a post a specific tag, but you don't necessarily want that tag appearing in the theme or creating an archive page. In Ghost, hashtags are private and can be used for special styling.

For example, if you sometimes publish posts with video content - you might want your theme to adapt and get rid of the sidebar for these posts, to give more space for an embedded video to fill the screen. In this case, you could use private tags to tell your theme what to do.

==**News**, Cycling, #video==

Here, the theme would assign the post publicly displayed tags of `News`, and `Cycling` - but it would also keep a private record of the post being tagged with `#video`.

In your theme, you could then look for private tags conditionally and give them special formatting:

```
{{#post}}
    {{#has tag="#video"}}
        ...markup for a nice big video post layout...
    {{else}}
        ...regular markup for a post...
    {{/has}}
{{/post}}
```

You can find documentation for theme development techniques like this and many more over on Ghost's extensive [theme documentation](https://themes.ghost.org/).
