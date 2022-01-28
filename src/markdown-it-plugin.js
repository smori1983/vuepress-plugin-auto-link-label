const Link = require('./link');

module.exports = ((ctx, { marker }) => {
  return (md) => {
    md.core.ruler.push('vuepress_plugin_auto_link_title', ((state) => {
      const link = new Link(marker);
      link.rewriteTitle(ctx.pages, state.tokens);
    }));
  };
});
