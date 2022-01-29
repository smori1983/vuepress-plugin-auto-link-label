# vuepress-plugin-auto-link-title


## Option

- `marker`: string of replace target (default: '`!`').


## Configuration

```
module.exports = {
  plugins: [
    ['auto-link-title', {
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

will be:

```
<p>See: <a href="/path1/page1.html">Page1</a>.</p>
```
