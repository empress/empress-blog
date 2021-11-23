/* eslint-disable prettier/prettier */
/* eslint-env node */

const Case = require('case');

module.exports = {
  description: 'Generates a new tag',

  locals(options) {
    return {
      title: Case.title(options.entity.name),
      name: Case.kebab(options.entity.name),
    };
  }
};
