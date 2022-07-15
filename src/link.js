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
     * @type {Map<string, string>}
     * @private
     */
    this._pageLabels = new Map();

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

            let label;
            if ((label = this._findLabel(href))) {
              children[i + 1].content = label;
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
      const label = page.title || page.path;
      this._pageLabels.set(page.regularPath, label);
      this._pageLabels.set('/' + page.relativePath, label);
    });
  }

  /**
   * @param {string} href
   * @return {string|null}
   * @private
   */
  _findLabel(href) {
    if (this._pageLabels.has(href)) {
      return this._pageLabels.get(href);
    }

    return null;
  }
}

module.exports = Link;
