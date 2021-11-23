/* eslint-disable ember/no-classic-classes, prettier/prettier, ember/use-ember-data-rfc-395-imports */
import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  keyForAttribute(key) { return key; }
});
