const Link = require('./link');

module.exports = ((ctx, { marker }) => {
  return (md) => {
    md.core.ruler.push('vuepress_plugin_auto_link_label', ((state) => {
      const link = new Link(marker);
      link.rewriteLabel(ctx.pages, state.tokens);
    }));
  };
});
