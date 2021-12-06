/* eslint-disable prettier/prettier, ember/no-string-prototype-extensions */
/* eslint-env node */
const path = require('path');
const stringUtils = require('ember-cli-string-utils');
const { applyBuildConfig, applyConfig } = require('empress-blueprint-helpers');
const recast = require('recast');
const { readFileSync, writeFileSync } = require('fs');

function applyNodeCurrentTarget(isEmberCLIAddon) {
  let targetsFile = './config/targets.js'

  if(isEmberCLIAddon) {
    targetsFile = './tests/dummy/config/targets.js';
  }

  const targetsAst = recast.parse(readFileSync(targetsFile));

  recast.visit(targetsAst, {
    visitAssignmentExpression (path) {
      let node = path.node;

      if (node.left.object.name === 'module' && node.left.property.name === 'exports') {
        let nodeProperty = node.right.properties.find(property => property.key.name === 'node');

        if(!nodeProperty) {
          let builders = recast.types.builders;
          nodeProperty = builders.property(
            'init',
            builders.identifier('node'),
            builders.literal('current')
          );
          node.right.properties.push(nodeProperty);
        }
      }

      this.traverse(path);
    }
  });

  writeFileSync(targetsFile, recast.print(targetsAst, { tabWidth: 2, quote: 'single' }).code);
}

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

    applyNodeCurrentTarget(this.project.isEmberCLIAddon());
  },

  filesToRemove: ['app/templates/application.hbs'],
};
