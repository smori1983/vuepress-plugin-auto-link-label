/**
 * @typedef {import('vuepress-types').Page} Page
 * @typedef {import('./link')} Link
 */

/**
 * @type {function(Page[], Link): function(*): void}
 */
module.exports = ((pages, link) => {
  return (md) => {
    md.core.ruler.push('vuepress_plugin_auto_link_label', ((state) => {
      link.rewriteLabel(pages, state.tokens);
    }));
  };
});
