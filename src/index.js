module.exports = (options, ctx) => {
  const {
    marker = '!',
  } = options;

  return {
    chainMarkdown(config) {
      config
        .plugin('vuepress-plugin-auto-link-label')
        .use(require('./markdown-it-plugin')(ctx, { marker: marker }));
    }
  };
};
