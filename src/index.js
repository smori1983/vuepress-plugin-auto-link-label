/**
 * @typedef {import('vuepress-types').Context} Context
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

const Link = require('./link');

/**
 * @param {Object} options
 * @param {Context} ctx
 * @return {PluginOptionAPI}
 */
module.exports = (options, ctx) => {
  const {
    marker = '!',
  } = options;

  const link = new Link(marker);

  return {
    chainMarkdown(config) {
      config
        .plugin('vuepress-plugin-auto-link-label')
        .use(require('./markdown-it-plugin')(ctx.pages, link));
    },
    async ready() {
      link.applicationInitialized();
    },
  };
};
