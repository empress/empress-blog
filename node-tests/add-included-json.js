const { getIncluded } = require('../lib/add-included-json');
const { expect } = require('chai');
const { map } = require('lodash');

describe('Add included json', function() {
    const author1 = {
      "data": {
        "type": "authors",
        "id": "ghost",
        "attributes": {
          "name": "Ghost",
        }
      }
    };
    const author2 = {
      "data": {
        "type": "authors",
        "id": "chris",
        "attributes": {
          "name": "Chris",
        }
      }
    };

    const content = {
      "data": {
        "type": "contents",
        "id": "ember",
        "attributes": {
          "title": "Why Ember"
        },
        "relationships": {
          "authors": {
            "data": [
              {
                "type": "authors",
                "id": "ghost"
              }
            ]
          }
        }
      }
    };

    it('add-included-json should return the proper included items', function() {
        let resources = [ content.data ];
        let jsonObj = {
          author: [
            {
              path: "author/ghost",
              json: author1
            },
            {
              path: "author/chris",
              json: author2
            }
          ],
          content: [
            {
              path: "content/why-ember",
              json: content
            }
          ]
        };

        let jsonPerFolder = new Map(
          map(jsonObj, (v, k) => ([k, v]))
        );

        expect(getIncluded("author", resources, jsonPerFolder)).to.deep.equal([author1.data]);
    })
})
