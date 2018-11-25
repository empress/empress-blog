/* eslint-env node */

module.exports = {
  description: 'The default blueprint for ember-ghost when installing in an addon.',

  normalizeEntityName() {
    // no-op
  },

  filesToRemove: ['tests/dummy/app/templates/application.hbs'],
};
