/* eslint-disable prettier/prettier */
const { expect } = require('chai');
const { createBuilder, createTempDir } = require('broccoli-test-helper');

const AutomaticNewTag = require('../lib/automatic-new-tag');

let output;
let input;

async function buildFiles(files) {
  input.write({
    content: files,
  });

  const subject = new AutomaticNewTag(`${input.path()}/content`);
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
    } finally {
      // do nothing
    }

    if (output) {
      await output.dispose();
    }
  });

  it('should automatically create a new tag for the most recent 4 posts', async function() {
    const files = await buildFiles({
      'index.md': `---
tags:
  - a-tag-of-sorts
authors:
  - ghost
date: Tue Jun 12 2018 17:50:59 GMT+0100 (IST)
---
# Hello world`,
      'index2.md': `---
tags:
  - a-tag-of-sorts
authors:
  - ghost
date: Tue Jun 11 2018 17:50:59 GMT+0100 (IST)
---
# Hello world`,
      'index3.md': `---
tags:
  - a-tag-of-sorts
authors:
  - ghost
date: Tue Jun 10 2018 17:50:59 GMT+0100 (IST)
---
# Hello world`,
      'index4.md': `---
tags:
  - a-tag-of-sorts
authors:
  - ghost
date: Tue Jun 09 2018 17:50:59 GMT+0100 (IST)
---
# Hello world`,
      'index5.md': `---
tags:
  - a-tag-of-sorts
authors:
  - ghost
date: Tue Jun 13 2018 17:50:59 GMT+0100 (IST)
---
# Hello world`
});

    // first file has new tag
    expect(files['index.md']).to.equal(`---
tags:
  - a-tag-of-sorts
  - new
authors:
  - ghost
date: 'Tue Jun 12 2018 17:50:59 GMT+0100 (IST)'
---
# Hello world`)
    // oldest file does not have new tag
    expect(files['index4.md']).to.equal(`---
tags:
  - a-tag-of-sorts
authors:
  - ghost
date: 'Tue Jun 09 2018 17:50:59 GMT+0100 (IST)'
---
# Hello world`)

  // last file alphabetically, but latest post has new tag
  expect(files['index5.md']).to.equal(`---
tags:
  - a-tag-of-sorts
  - new
authors:
  - ghost
date: 'Tue Jun 13 2018 17:50:59 GMT+0100 (IST)'
---
# Hello world`)
  })
})
