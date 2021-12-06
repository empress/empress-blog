/* eslint-disable prettier/prettier */
import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/template';
import { isEmpty } from '@ember/utils';
import downsize from 'downsize-cjs';

export function getExcerpt(html, truncateOptions) {
  truncateOptions = truncateOptions || {};
  // Strip inline and bottom footnotes
  const excerpt = stripHTML(html);

  if (!truncateOptions.words && !truncateOptions.characters) {
    truncateOptions.words = 50;
  }

  return downsize(excerpt, truncateOptions);
}

export function stripHTML(html) {
  let strippedHTML = html.replace(/<a href="#fn.*?rel="footnote">.*?<\/a>/gi, '');
  strippedHTML = strippedHTML.replace(/<div class="footnotes"><ol>.*?<\/ol><\/div>/, '');
  // Strip other html
  strippedHTML = strippedHTML.replace(/<\/?[^>]+>/gi, '');
  strippedHTML = strippedHTML.replace(/(\r\n|\n|\r)+/gm, ' ');

  return strippedHTML;
}

export function excerpt(content, options/*, hash*/) {
  let truncateOptions = options || {};
  const excerptText = options.custom_excerpt ? String(options.custom_excerpt) : String(content);

  let { words, characters } = truncateOptions;
  truncateOptions = { words, characters };
  Object.keys(truncateOptions).map(function (key) {
    truncateOptions[key] = parseInt(truncateOptions[key], 10);
  });

  if (!isEmpty(options.custom_excerpt)) {
    truncateOptions.characters = options.custom_excerpt.length;
    if (truncateOptions.words) {
      delete truncateOptions.words;
    }
  }

  return htmlSafe(
    getExcerpt(excerptText, truncateOptions)
  );
}

export default helper(excerpt);
