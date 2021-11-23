/* eslint-disable prettier/prettier */
/* eslint-env node */

module.exports = {
  description: 'The default blueprint for empress-blog when installing in an addon.',

  normalizeEntityName() {
    // no-op
  },

  filesToRemove: ['tests/dummy/app/templates/application.hbs'],
};
