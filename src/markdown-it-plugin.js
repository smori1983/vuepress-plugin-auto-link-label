/**
 * @typedef {import('vuepress-types').Context} Context
 * @typedef {import('./link')} Link
 */

/**
 * @type {function(Context, Link): function(*): void}
 */
module.exports = ((ctx, link) => {
  return (md) => {
    md.core.ruler.push('vuepress_plugin_auto_link_label', ((state) => {
      link.rewriteLabel(ctx.pages, state.tokens);
    }));
  };
});
