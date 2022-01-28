module.exports = {
  title: 'example site',
  head: [],

  themeConfig: {
    sidebar: [
      {
        title: 'debug',
        collapsable: false,
        children: [
          '/debug/',
        ],
      },
    ],
  },

  plugins: [
    [require('../../src')],
  ],

  markdown: {
    extendMarkdown: (md) => {
      md.set({ breaks: true });
    },
  },
};
