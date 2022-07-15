# vuepress-plugin-auto-link-label

Replaces Markdown link label (specified by '`marker`' option) with page title.


## Option

- `marker`: string of replace target (default: '`!`').


## Configuration

`.vuepress/config.js`

```
module.exports = {
  plugins: [
    ['auto-link-label', {
      marker: '!!!',
    }],
  ],
};
```


## Example

`/path1/page1.md`

```
# Page 1

...
```

`/path2/page2.md`

```
See: [!](/path1/page1.md).
```

will be (`!` is converted to `Page 1`):

```html
<p>See: <a href="/path1/page1.html">Page 1</a>.</p>
```
