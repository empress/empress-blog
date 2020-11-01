import LinkComponent from '@ember/routing/link-component';

export default LinkComponent.extend({
  click() {
    if(window.scrollTo) {
      window.scrollTo(0,0);
    }
  }
});
