/* eslint-disable ember/no-classic-classes, prettier/prettier */
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  blog: service(),
})
