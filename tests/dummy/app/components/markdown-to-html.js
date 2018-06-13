import MarkdownToHTML from 'ember-cli-showdown/components/markdown-to-html';

// I don't know why it's not picking up this from the app folder in the addon :shrug:
export default MarkdownToHTML.extend({
  classNames: ['kg-card-markdown'],
})
