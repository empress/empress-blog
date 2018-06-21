/* eslint-env node */
const recast = require('recast');
const { readFileSync, writeFileSync } = require('fs');

module.exports = {
  description: 'The default blueprint for ember-casper-template.',

  normalizeEntityName() {
    // no-op
  },

  afterInstall() {
    this.addAddonsToProject({
      packages: [
        'prember@0.3.0',
        'ember-cli-cjs-transform',
        'ember-cli-fastboot',
        'ember-moment',
      ]
    });

    const builders = recast.types.builders;

    const code = readFileSync('./ember-cli-build.js');
    const ast = recast.parse(code);

    recast.visit(ast, {
      visitNewExpression: function (path) {
        var node = path.node;

        if (node.callee.name === 'EmberApp'
            || node.callee.name === 'EmberAddon') {
          // console.log(node, node.arguments)
          const configNode = node.arguments.find(element => element.type === 'ObjectExpression');

          let fingerprint = configNode.properties.find(property => property.key.value === 'fingerprint');

          if(!fingerprint) {
            fingerprint = builders.property(
              'init',
              builders.identifier('fingerprint'),
              builders.objectExpression([])
            )
            configNode.properties.push(fingerprint);
          }

          // remove extensions from
          const properties = fingerprint.value.properties.filter(property => property.key.value !== 'extensions');

          properties.push(recast.types.builders.property(
            'init',
            builders.identifier('extensions'),
            builders.arrayPattern([
              builders.literal('js'),
              builders.literal('css'),
              builders.literal('map'),
            ])
          ));

          fingerprint.value.properties = properties;


          // console.log(fingerprint);
          return false;
        } else {
          this.traverse(path);
        }
      }
    });

    writeFileSync('./ember-cli-build.js', recast.print(ast, { tabWidth: 2, quote: 'single' }).code);

    const config = readFileSync('./config/environment.js');
    const configAst = recast.parse(config);

    recast.visit(configAst, {
      visitVariableDeclaration: function (path) {
        var node = path.node;

        const env = node.declarations.find(declaration => declaration.id.name === 'ENV');

        if (env) {
          let blog = env.init.properties.find(property => property.key.value === 'blog');

          if(!blog) {
            blog = builders.property(
              'init',
              builders.identifier('blog'),
              builders.objectExpression([
                builders.property('init', builders.identifier('title'), builders.literal('Ember Ghost')),
                builders.property('init', builders.identifier('description'), builders.literal('Static Blog System - Built with Ember')),
                builders.property('init', builders.identifier('coverImage'), builders.literal('/images/blog-cover.jpg')),
                builders.property('init', builders.identifier('navigation'), builders.arrayPattern([
                  builders.objectExpression([
                    builders.property('init', builders.identifier('label'), builders.literal('Home')),
                    builders.property('init', builders.identifier('route'), builders.literal('index')),
                  ]),
                  builders.objectExpression([
                    builders.property('init', builders.identifier('label'), builders.literal('Built by Stone Circle')),
                    builders.property('init', builders.identifier('route'), builders.literal('page')),
                    builders.property('init', builders.identifier('id'), builders.literal('stone-circle')),
                  ])
                ])),
              ])
            )
            env.init.properties.push(blog);
          }

          return false;
        }

        this.traverse(path);
      }
    });

    writeFileSync('./config/environment.js', recast.print(configAst, { tabWidth: 2, quote: 'single' }).code);
  },

  filesToRemove: ['app/templates/application.hbs'],
};
