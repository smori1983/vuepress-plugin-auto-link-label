module.exports = {
  title: 'vuepress-plugin-auto-link-label',
  head: [],

  themeConfig: {
    search: false,
    nav: [
      { text: 'npm', link: 'https://www.npmjs.com/package/vuepress-plugin-auto-link-label' },
    ],
    sidebar: [
      {
        title: 'debug',
        collapsable: false,
        children: [
          '/debug/',
        ],
      },
      {
        title: 'pages',
        collapsable: false,
        children: [
          '/pages/page1.md',
          '/pages/page2.md',
          '/pages/page3.md',
          '/pages/page4.md',
        ],
      },
    ],
  },

  plugins: [
    [require('../../src'), {
      marker: '!',
    }],
  ],

  markdown: {
    extendMarkdown: (md) => {
      md.set({ breaks: true });
    },
  },
};
