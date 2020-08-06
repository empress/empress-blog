/* eslint-env node */
const path = require('path');
const stringUtils = require('ember-cli-string-utils');
const { applyBuildConfig, applyConfig } = require('empress-blueprint-helpers');

module.exports = {
  description: 'The default blueprint for empress-blog.',

  normalizeEntityName() {
    // no-op
  },

  fileMapTokens: function() {
    let isAddon = this.project.isEmberCLIAddon();
    return {
      __base__() {
        if(isAddon) {
          return path.join('tests', 'dummy');
        }
        return '';
      }
    }
  },

  locals: function(options) {
    let packageName = options.project.name();
    let dasherizedPackageName = stringUtils.dasherize(packageName);

    if(options.project.isEmberCLIAddon()) {
      dasherizedPackageName = 'dummy';
    }

    return {
      dasherizedPackageName,
    };
  },

  async afterInstall() {
    let devInstall = {
      packages: [
        'prember',
        'ember-cli-fastboot',
      ]
    }

    await this.addAddonsToProject(devInstall);

    applyBuildConfig('fingerprint', { extensions: ['js', 'css', 'map'] }, true);

    applyConfig(this.project, 'blog', {
      title: 'empress-blog',
      description: 'Static Blog System - Built with Ember',
      coverImage: '/images/blog-cover.jpg',
      navigation: [{
        label: 'Home',
        route: 'index'
      }, {
        label: 'Built by Chris Manson',
        route: 'page',
        id: 'chris-manson'
      }]
    });
  },

  filesToRemove: ['app/templates/application.hbs'],
};
