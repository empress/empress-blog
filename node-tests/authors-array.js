const { modifyFile } = require('../lib/authors-array');
const { expect } = require('chai');

describe('Authors array', function() {
    it('modify-file should modify the author to authors', function() {
        let input = `---
title: Setting up your own Ghost theme
image: /images/design.jpg
imageMeta:
    attribution:
    attributionLink:
featured: true
author: ghost
date: Tue Jun 12 2018 17:49:21 GMT+0100 (IST)
tags:
    - getting-started
---
`

        let output = `---
title: Setting up your own Ghost theme
image: /images/design.jpg
imageMeta:
    attribution:
    attributionLink:
featured: true
authors: 
  - ghost
date: Tue Jun 12 2018 17:49:21 GMT+0100 (IST)
tags:
    - getting-started
---
`

        expect(modifyFile(input)).to.equal(output);
    })
})