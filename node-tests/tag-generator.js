const { expect } = require('chai');

const { createBuilder, createTempDir } = require('broccoli-test-helper');

const TagGenerator = require('../lib/tag-generator');

let output;
let input;

async function buildFiles(files) {
  input.write({
    content: files,
  });

  const subject = new TagGenerator(`${input.path()}/content`);
  output = createBuilder(subject);

  await output.build();

  return output.read();
}

describe.only('Tag Generator', function() {
  beforeEach(async () => {
    input = await createTempDir();
  });

  afterEach(async () => {
    try {
      await input.dispose();
    } finally {
      // do nothing
    }

    if (output) {
      await output.dispose();
    }
  });

  it('should generate a single tag when there is one defined on the content', async function() {
    const files = await buildFiles({
      'index.md': `---
tags:
- a-tag-of-sorts
---
# Hello world`
});
    expect(files).to.have.property('a-tag-of-sorts.md');
    expect(files['a-tag-of-sorts.md']).to.equal(`---
name: A Tag of Sorts
id: a-tag-of-sorts
image:
imageMeta:
---
`)
  })

  it('should generate no tags when there are no tags defined on content', async function() {
    const files = await buildFiles({
      'index.md': `---
tags:
---
# Hello world`
});
    expect(files).to.deep.equal({});
  });

  it('should generate two tags when there are two content that have one tag each', async function() {
    const files = await buildFiles({
      'index.md': `---
tags:
  - a-tag-of-sorts
---
# Hello world`,
      'other.md': `---
tags:
 - second-tag
---
# Hi there`
});
    expect(files).to.have.property('a-tag-of-sorts.md');
    expect(files).to.have.property('second-tag.md');

    expect(Object.keys(files)).to.have.length(2);
  });

  it('should not duplicate tags when there are overlaps between content tags', async function() {
    const files = await buildFiles({
      'index.md': `---
tags:
  - a-tag-of-sorts
  - second-tag
  - so-many-tags
---
# Hello world`,
      'other.md': `---
tags:
 - second-tag
---
# Hi there`
});
    expect(files).to.have.property('a-tag-of-sorts.md');
    expect(files).to.have.property('second-tag.md');
    expect(files).to.have.property('so-many-tags.md');

    expect(Object.keys(files)).to.have.length(3);
  });
})
