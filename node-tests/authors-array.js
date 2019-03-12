const { modifyFile } = require('../lib/authors-array');
const { expect } = require('chai');

describe('Authors array', function() {
    it('modify-file should modify the author to authors', function() {
        let input = `---
title: Setting up your own Ghost theme
image: /images/design.jpg
imageMeta:
    attribution: face
    attributionLink: https://www.emberjs.com/face
featured: true
authors:
  - ghost
date: Tue Jun 12 2018 17:49:21 GMT+0100 (IST)
tags:
    - getting-started
---
This is the content of the blog!
`

        let output = `---
title: Setting up your own Ghost theme
image: /images/design.jpg
imageMeta:
  attribution: face
  attributionLink: 'https://www.emberjs.com/face'
featured: true
date: 'Tue Jun 12 2018 17:49:21 GMT+0100 (IST)'
tags:
  - getting-started
authors:
  - ghost
---
This is the content of the blog!
`

        expect(modifyFile(input)).to.equal(output);
    })

    it('modify-file should do nothing when authors is already there', function() {
        let file = `---
title: Setting up your own Ghost theme
image: /images/design.jpg
imageMeta:
  attribution: face
  attributionLink: 'https://www.emberjs.com/face'
featured: true
authors:
  - ghost
date: 'Tue Jun 12 2018 17:49:21 GMT+0100 (IST)'
tags:
  - getting-started
---
This is the content of the blog!
`

        expect(modifyFile(file)).to.equal(file);
    })
})