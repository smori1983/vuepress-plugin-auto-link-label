/**
 * @typedef {import('vuepress-types').Page} Page
 */

class Link {
  /**
   * @param {string} marker
   */
  constructor(marker) {
    /**
     * @type {boolean}
     * @private
     */
    this._applicationInitialized = false;

    /**
     * @type {boolean}
     * @private
     */
    this._pagesCollected = false;

    /**
     * @type {Map<string, Page|null>}
     * @private
     */
    this._found = new Map();

    /**
     * @type {string}
     * @private
     */
    this._marker = marker;
  }

  /**
   * Supposed to be called when lifecycle ready() hook was executed.
   *
   * At that time all page data will be able to collect.
   */
  applicationInitialized() {
    this._applicationInitialized = true;
  }

  /**
   * @param {Page[]} pages
   * @param {Object[]} tokens
   */
  rewriteLabel(pages, tokens) {
    if (this._applicationInitialized === false) {
      return;
    }

    if (this._pagesCollected === false) {
      this._collectPages(pages);
      this._pagesCollected = true;
    }

    tokens.forEach((token) => {
      if (token.type === 'inline' && token.children.length > 0) {
        const children = token.children;

        for (let i = 0, len = children.length; i + 2 < len; i++) {
          if (
            children[i].type === 'link_open' &&
            children[i + 1].type === 'text' &&
            children[i + 2].type === 'link_close' &&
            children[i + 1].content === this._marker
          ) {
            const href = children[i].attrGet('href');

            let page;
            if ((page = this._findPageForHref(href))) {
              children[i + 1].content = page.title || page.path;
            }

            i += 3;
          }
        }
      }
    });
  }

  /**
   * @param {Page[]} pages
   * @private
   */
  _collectPages(pages) {
    // - href like '/path/' matches page.regularPath
    // - href like '/path/page.md' matches '/' + page.relativePath
    pages.forEach((page) => {
      this._found.set(page.regularPath, page);
      this._found.set('/' + page.relativePath, page);
    });
  }

  /**
   * @param {string} href
   * @return {Page|null}
   * @private
   */
  _findPageForHref(href) {
    if (this._found.has(href)) {
      return this._found.get(href);
    }

    return null;
  }
}

module.exports = Link;
