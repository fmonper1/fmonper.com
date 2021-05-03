---
title: 'Rendering markdown in Next.js'
subtitle: 'Long live the JAMStack'
date: '2020-03-16T05:35:07.322Z'
tags:
- react
- markdown
excerpt: Creating static websites has never been easier. Find out how to render markdown from any headless CMS or your file system inside your React components.
---

Creating static websites has never been easier. The JAMStack has made it very easy to create complex static websites utilizing the power of Markup.

## Writing content in Markdown
For quite some time I've used Vuepress to create simple static websites, but I use React on a day-to-day basis, so ultimately I decided to integrate markdown content into my NextJS projects.

### Assumptions
This article assumes that you can access a piece of Markdown text from your front-end. This can be done though a headless CMS or your own file-system. I will be using ContentfulCMS.

## Rendering Markdown in NextJS
We will make use of a couple nifty packages to transform our Markdown into sanitized HTML.

### Marked.js
Marked.js is "a low-level markdown compiler for parsing markdown without caching or blocking for long periods of time". It takes in a String of Markdown and returns us a string of HTML.

```shell
$ yarn add marked
```

Once marked is installed we can go on a import the following

```jsx
import marked from "marked";
```

We can the setup then initiate a simple renderer.

```jsx
const [html, setHtml] = useState("");
useEffect(() => {
  const renderer = ({
    link(href, title, text) {
      return renderToString(
        <Link href={href}>
          <a
            href={href}
            className="inline-flex items-end text-primary-main underline"
          >
            {text}
          </a>
        </Link>
      );
    },
    heading(text, level) {
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
      return renderToString(
        <Title size={level}>
          <>
            <a className="anchor" href={`#${escapedText}`}>
              <span className="mr-2">#</span>
            </a>
            {text}
          </>
        </Title>
      );
    },
  });
  marked.use({ renderer });
  setHtml(marked(markdwonInVariable));
}, []);

```
This simple configuration allow us to modifyu the link `<a></a>` and heading `<hX></hX>` tags. Notice how I am using the `renderToString`function. This will alow us to use React components insted of plain HTML tags.

Based on your use case you might not need this, so you just can just use plain old HTML with template literals.

```jsx
...
link(href, title, text) {
  return `
      <a
        href="${href}"
        className="inline-flex items-end text-primary-main underline"
      >
        ${text}
      </a>
  `;
},
...
```

Now that we have our HTML saved on a state, we can setItDangerousely ;)
```jsx
<div
  id="post-entry"
  dangerouslySetInnerHTML={{
    __html: html,
  }}
/>
```

### DOMPurifier
If we are going to use the `dangerouslySetInnerHTML` prop we will want to be sure that our content has been previously sanitized. To do this we will use DOMPurifier, "a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG."

```shell
$ yarn add dompurify
```

Now we can import the package and sanitize the HTML returned by Marked

```jsx
import DOMPurify from "dompurify";
...
setHtml(DOMPurify.sanitize(marked(markdwonInVariable)));
```

Our HTML will now be safe to insert into our page.

### Syntax highlighting
We can also apply syntax highlighting to the code written inside our Markdown. For this we will be using [Prism](https://prismjs.com/) which is a battle-tested syntax highligter for the web.

Lets add it to our project.
```shell
$ yarn add prism
```
Now we can import it in our controller and use the `highlightAll()` method  to convert our `<pre></pre>` and `<code></code>` tags into highlighted text.

```jsx
import * as prism from "prismjs";
...
useEffect(() => {
  if (html === "") return;
  prism.highlightAll();
}, [html]);
```

## Creating a useMarkdown() hook
We might have different pages where we want to render Markup so we want to be able to reuse the code for parsing Markdown. To achieve this we can create our own `useMarkdown()` hook.

```jsx
import React, { useEffect, useState } from "react";
import marked from "marked";
import { renderToString } from "react-dom/server";
import Link from "next/link";
import Icon from "@mdi/react";
import { mdiOpenInNew } from "@mdi/js";
import Title from "@components/atoms/Title";
import * as prism from "prismjs";
import DOMPurify from "dompurify";

const useMarkdown = (markdown) => {
  const [html, setHtml] = useState("");
  useEffect(() => {
    const renderer = ({
      link(href, title, text) {
        return renderToString(
          <Link href={href}>
            <a
              href={href}
              className="inline-flex items-end text-primary-main underline"
            >
              {text}
            </a>
          </Link>
        );
      },
      heading(text, level) {
        const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
        return renderToString(
          <Title size={level}>
            <>
              <a className="anchor" href={`#${escapedText}`}>
                <span className="mr-2">#</span>
              </a>
              {text}
            </>
          </Title>
        );
      },
    });
    marked.use({ renderer });
    setHtml(DOMPurify.sanitize(marked(markdown)));
  }, []);
  useEffect(() => {
    if (html === "") return;
    prism.highlightAll();
  }, [html]);

  return html;
};

export default useMarkdown;
```

Now we can import and use our hook in all of our components:

```jsx
const html = useMarkdown(post.fields.body);
...
<div
  id="post-entry"
  dangerouslySetInnerHTML={{
    __html: html,
  }}
/>
```
