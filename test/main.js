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

// Pattern 1

const link1 = new Link('!');
link1.applicationInitialized();

const md1 = new MarkdownIt();
md1.use(require('../src/markdown-it-plugin')(pages, link1));

testGen(path.resolve(__dirname, 'fixtures1'), {header: true}, md1);

// Pattern 2

const link2 = new Link('@');
link2.applicationInitialized();

const md2 = new MarkdownIt();
md2.use(require('../src/markdown-it-plugin')(pages, link2));

testGen(path.resolve(__dirname, 'fixtures2'), {header: true}, md2);
