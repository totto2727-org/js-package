# @totto/lib/remark-link-card

A library to generate link cards with Remark.

This is a fork of
[gladevise/remark-link-card](https://github.com/gladevise/remark-link-card). We
have not been able to take over the history due to the monorepo project. Thanks
to @gladevise!

[Remark](https://github.com/remarkjs/remark) plugin to convert text links to
link cards inspired by
[gatsby-remark-link-card](https://github.com/JaeYeopHan/gatsby-remark-link-card)

## Usage

Here is simple example.

```ts
import { remark } from "npm:remark";
import { rlc } from "jsr:@totto/lib/remark-link-card";

const exampleMarkdown = `
# remark-link-card

## Bare links

Bare links are converted to link cards.

http://example.com/

https://www.npmjs.com/package/remark-link-card

<http://example.com/>

<https://www.npmjs.com/package/remark-link-card>

## Inline links

Inline links are **not** converted to link cards.

[example](http://example.com/) is inline link

[remark-link-card](https://www.npmjs.com/package/remark-link-card) is inline link

## Multiple links in one line

If there are multiple links in one line, they will **not** be converted to link cards.

http://example.com/ http://example.com/ http://example.com/
`;

(async () => {
  const result = await remark()
    // disabled error log
    .use(rlc, { error: false })
    .process(exampleMarkdown);

  console.log(result.toString());
})();
)
```

You can get converted result like this.

<!-- deno-fmt-ignore-start -->
```markdown
# remark-link-card

## Bare links

Bare links are converted to link cards.

<a class="rlc-container" href="http://example.com/">
  <div class="rlc-info">
    <div class="rlc-title">example.com</div>
    <div class="rlc-url-container">
      <img class="rlc-favicon" src="https://www.google.com/s2/favicons?domain=example.com" alt="example.com favicon" width="16" height="16">
      <span class="rlc-url">http://example.com/</span>
    </div>
  </div>
</a>

<a class="rlc-container" href="https://www.npmjs.com/package/remark-link-card">
  <div class="rlc-info">
    <div class="rlc-title">www.npmjs.com</div>
    <div class="rlc-url-container">
      <img class="rlc-favicon" src="https://www.google.com/s2/favicons?domain=www.npmjs.com" alt="www.npmjs.com favicon" width="16" height="16">
      <span class="rlc-url">https://www.npmjs.com/package/remark-link-card</span>
    </div>
  </div>
</a>

<a class="rlc-container" href="http://example.com/">
  <div class="rlc-info">
    <div class="rlc-title">example.com</div>
    <div class="rlc-url-container">
      <img class="rlc-favicon" src="https://www.google.com/s2/favicons?domain=example.com" alt="example.com favicon" width="16" height="16">
      <span class="rlc-url">http://example.com/</span>
    </div>
  </div>
</a>

<a class="rlc-container" href="https://www.npmjs.com/package/remark-link-card">
  <div class="rlc-info">
    <div class="rlc-title">www.npmjs.com</div>
    <div class="rlc-url-container">
      <img class="rlc-favicon" src="https://www.google.com/s2/favicons?domain=www.npmjs.com" alt="www.npmjs.com favicon" width="16" height="16">
      <span class="rlc-url">https://www.npmjs.com/package/remark-link-card</span>
    </div>
  </div>
</a>

## Inline links

Inline links are **not** converted to link cards.

[example](http://example.com/) is inline link

[remark-link-card](https://www.npmjs.com/package/remark-link-card) is inline link

## Multiple links in one line

If there are multiple links in one line, they will **not** be converted to link cards.

http://example.com/ http://example.com/ http://example.com/
```
<!-- deno-fmt-ignore-end -->

You can style link card like this.

```css
.rlc-container {
  width: 100%;
  max-width: 800px;
  max-height: 120px;
  margin: 0 auto 2rem;

  color: black;
  text-decoration: none;

  border: 1px solid black;
  border-radius: 0.25rem;
  display: flex;
  align-items: stretch;

  transition: background 200ms ease-in-out 0s, box-shadow 200ms ease-in-out 0s;
}

.rlc-container:hover{
  background-color: rgba(80,80,80, 0.1);
  box-shadow: 0 4px 5px 2px rgba(80,80,80, 0.2);
}

.rlc-info {
  overflow: hidden;
  padding: 0.5rem;
  flex: 4 1 100px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.rlc-title {
  font-size: 1.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rlc-description {
  font-size: 0.875rem;
  color: #333;
  overflow: hidden;
  line-height:1rem;
  height: 2rem;
}

.rlc-url-container {
  display: flex;
  align-items: center;
}

.rlc-favicon {
  margin-right: 4px;
  width: 16px;
  height: 16px;
}

.rlc-url {
  font-size: 1rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.rlc-image-container {
  position: relative;
  flex: 1 1 100px;
}

.rlc-image {
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-bottom-right-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
```

## API

### `remark().use(rlc[, options])`

Convert text links to link cards.

#### `options`

##### `options.shortenUrl`

Display only hostname of target URL (`bool`, default: `false`)

If `options.shortenUrl` is `true`, the output will look like this.

```markdown
<a class="rlc-container" href="https://www.npmjs.com/package/remark-link-card">
  <div class="rlc-info">
    <div class="rlc-title">remark-link-card</div>
    <div class="rlc-description">remark plugin to convert literal link to link card</div>
    <div class="rlc-url-container">
      <img class="rlc-favicon" src="https://www.google.com/s2/favicons?domain=www.npmjs.com" alt="remark-link-card favicon" width="16px" height="16px">
      <span class="rlc-url">www.npmjs.com</span>
    </div>
  </div>
  <div class="rlc-image-container">
    <img class="rlc-image" src="https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png" alt="remark-link-card" width="100%" height="100%"/>
  </div>
</a>
```

##### `options.timeout`

Timeout time(milisecond) for internally executed `fetch()`（`number`, default:
`10000`）
