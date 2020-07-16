const { expect } = require('chai');

const { createBuilder, createTempDir } = require('broccoli-test-helper');

const TagIncludePosts = require('../lib/tag-include-posts');

let output;
let input;

async function buildFiles(files, type) {
  input.write(files);

  const subject = new TagIncludePosts(input.path(), {
    itemType: type
  });
  output = createBuilder(subject);

  await output.build();

  return output.read();
}

describe('Tag Generator', function() {
  beforeEach(async () => {
    input = await createTempDir();
  });

  afterEach(async () => {
    try {
      await input.dispose();

      if (output) {
        await output.dispose();
      }
    } finally {
      // we don't want to do anything with the error if the `dispose()` fails
      // because it is likely unrealated to the thing we're testing if it does.
      // In most cases we want to wait for these two folders to be deleted
      // after each test but it shouldn't block us
    }
  });

  it('should add the relationship to content in the tag', async function() {
    const files = await buildFiles({
      content: {
        'index.md': `---
tags:
- new
---
# Hello world`},
      tag: {
        'new.md': `---
name: New Posts
image: ''
imageMeta: ''
---
`}
    }, 'tag');

    expect(files).to.have.property('new.md');
    expect(files['new.md']).to.equal(`---
name: New Posts
image: ''
imageMeta: ''
posts:
  - index
---
`)
  });

  it('should order the relationship ids for tags ordered by date decending', async function() {
    const files = await buildFiles({
      content: {
        'a-post-most-recent.md': `---
date: 2020-01-10
tags:
- new
---
# Hello world A`,
        'b-post-oldest.md': `---
date: 2010-01-10
tags:
- new
---
# Hello world B`,
        'c-post-medium-recent.md': `---
date: 2020-01-05
tags:
- new
---
# Hello world C`},
      tag: {
        'new.md': `---
name: New Posts
image: ''
imageMeta: ''
---
`}
    }, 'tag');

    expect(files).to.have.property('new.md');
    expect(files['new.md']).to.equal(`---
name: New Posts
image: ''
imageMeta: ''
posts:
  - a-post-most-recent
  - c-post-medium-recent
  - b-post-oldest
---
`)
  });

  it('ignores tags that exist with no content for them', async function() {
    const files = await buildFiles({
      content: {
        'index.md': `---
tags:
- new
---
# Hello world`},
      tag: {
        'new.md': `---
name: New Posts
image: ''
imageMeta: ''
---
`,
        'abandoned.md': `---
name: No Posts for me
image: ''
imageMeta: ''
---
`}
    }, 'tag');

    expect(files).to.have.property('abandoned.md');
    expect(files['abandoned.md']).to.equal(`---
name: No Posts for me
image: ''
imageMeta: ''
---
`)
  });

  it('should add the relationship to content in the author', async function() {
    const files = await buildFiles({
      content: {
        'index.md': `---
authors:
- james
---
# Hello world`},
      author: {
        'james.md': `---
name: James
image: ''
imageMeta: ''
---
`}
    }, 'author');

    expect(files).to.have.property('james.md');
    expect(files['james.md']).to.equal(`---
name: James
image: ''
imageMeta: ''
posts:
  - index
---
`)
  });

  it('should order the relationship ids for authors ordered by date decending', async function() {
    const files = await buildFiles({
      content: {
        'a-post-most-recent.md': `---
date: 2020-01-10
authors:
- james
---
# Hello world A`,
        'b-post-oldest.md': `---
date: 2010-01-10
authors:
- james
---
# Hello world B`,
        'c-post-medium-recent.md': `---
date: 2020-01-05
authors:
- james
---
# Hello world C`},
      author: {
        'james.md': `---
name: James
image: ''
imageMeta: ''
---
`}
    }, 'author');

    expect(files).to.have.property('james.md');
    expect(files['james.md']).to.equal(`---
name: James
image: ''
imageMeta: ''
posts:
  - a-post-most-recent
  - c-post-medium-recent
  - b-post-oldest
---
`)
  });

  it('ignores authors that exist with no content for them', async function() {
    const files = await buildFiles({
      content: {
        'index.md': `---
author:
- james
---
# Hello world`},
      author: {
        'james.md': `---
name: New Posts
image: ''
imageMeta: ''
---
`,
        'abandoned.md': `---
name: Jonny no posts
image: ''
imageMeta: ''
---
`}
    }, 'author');

    expect(files).to.have.property('abandoned.md');
    expect(files['abandoned.md']).to.equal(`---
name: Jonny no posts
image: ''
imageMeta: ''
---
`)
  });
})
