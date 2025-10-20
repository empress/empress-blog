import { useRecommendedStore } from '@warp-drive/core';
import { JSONAPICache } from '@warp-drive/json-api';

export default useRecommendedStore({
  cache: JSONAPICache,
  schemas: [
    {
      type: 'tags',
      identity: { kind: '@id', name: 'id' },
      fields: [
        { kind: 'field', name: 'name', sourceKey: 'name' },
        { kind: 'field', name: 'image', sourceKey: 'image' },
        { kind: 'field', name: 'imageMeta', sourceKey: 'imageMeta' },
        { kind: 'field', name: 'content', sourceKey: 'content' },
        { kind: 'field', name: 'html', sourceKey: 'html' },
        { kind: 'field', name: 'meta', sourceKey: 'meta' },
        {
          kind: 'collection',
          name: 'posts',
          type: 'contents',
          options: { async: false, inverse: 'tags', polymorphic: true },
        },
      ],
    },
    {
      type: 'contents',
      identity: { kind: '@id', name: 'id' },
      fields: [
        {
          kind: 'collection',
          name: 'tags',
          type: 'tags',
          options: { async: false, inverse: 'posts', polymorphic: true },
        },
      ],
    }
  ],
});
