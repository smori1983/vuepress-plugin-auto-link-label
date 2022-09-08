const path = require('path');
const testGen = require('markdown-it-testgen');
const MarkdownIt = require('markdown-it');
const Link = require('../src/link');

const pages = [
  {
    title: 'Page 01',
    regularPath: '/page_01.html',
    relativePath: 'page_01.md',
  },
];

const link = new Link('!');
link.applicationInitialized();

const md = new MarkdownIt();
md.use(require('../src/markdown-it-plugin')(pages, link));

testGen(path.resolve(__dirname, 'fixtures'), {header: true}, md);
