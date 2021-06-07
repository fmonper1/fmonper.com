---
title: Rendering markdown in Next.js
subtitle: Long live the JAMStack
tags:
- react
- markdown
excerpt: Creating static websites has never been easier. Find out how to render markdown from any headless CMS or your file system inside your React components
---
 
This entry outlines the code I used to render my markdown blog with Nextjs. 

## Setup

I use Nextjs to generate static sites and host them on Netlify. 
To render posts I need to scan different folders during the build process to find the content for the entries.

I also need a library to parse the .md files and get the HTML to be rendered.

## The parser

```tsx
import marked, { Renderer } from "marked";
import { renderToString } from "react-dom/server";
import Link from "next/link";
import Icon from "@mdi/react";
import { mdiOpenInNew } from "@mdi/js";
import Title from "@components/atoms/Title";
import React from "react";

const MarkdownParser = {
  parse(markdown: string) {
    const headings = [];

    marked.use({
      // @ts-ignore
      renderer: {
        link(href, title, text) {
          return renderToString(
            <Link href={href}>
              <a
                href={href}
                className="inline-flex items-end text-primary-main underline"
              >
                {text}
                <Icon path={mdiOpenInNew} size={0.75} />
              </a>
            </Link>
          );
        },
        heading(text, level) {
          const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
          headings.push({ text, slug: escapedText, level });
          return renderToString(
            <Title size={level} className={level <= 2 ? "pt-3" : ""}>
              <a className="anchor" href={`#${escapedText}`} id={escapedText}>
                <span className="mr-2">#</span>
                {text}
              </a>
            </Title>
          );
        },
        code(code, language) {
          return renderToString(
            <div>
              <div className="codeblock-lang text-sm font-bold p-2 px-4 bg-secondary-main -mb-0 flex">
                {language}
              </div>
              <pre className={`language-${language} mt-0`}>
                <code className={`language-${language}`}>{code}</code>
              </pre>
            </div>
          );
        },
      },
    });
    return { data: marked(markdown), headings };
  },
};

export default MarkdownParser;
```


## The service

```ts
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");
const gistsDirectory = join(process.cwd(), "_gists");

type NavItem = Pick<IMarkdownPost, "title" | "slug">;

export interface IMarkdownPost {
  title: string;
  slug: string;
  path: string;
  date: string;
  author: string;
  content?: string;
  tags?: string[];
  nextPost?: NavItem;
  previousPost?: NavItem;
  image?: string;
  excerpt?: string;
  subtitle?: string;
  ogImage?: string;
  coverImage?: string;
}

class MarkdownService {
  readonly directory;
  readonly pathsToSlugs;
  readonly slugsToPaths;

  constructor(directory: string) {
    this.directory = directory;
    this.pathsToSlugs = this.getPathsToSlugs();
    this.slugsToPaths = this.getSlugsToPaths();
  }

  /**
   * Instead of complex filtering, map slugs to filesystem paths and
   * access an object by its key
   */
  private getPathsToSlugs() {
    const pathToSlug = {};
    fs.readdirSync(this.directory).map(
      (item) => (pathToSlug[item] = this.trimDate(this.replaceExtension(item)))
    );
    return pathToSlug;
  }

  private getSlugsToPaths() {
    const slugToPath = {};
    fs.readdirSync(this.directory).map(
      (item) => (slugToPath[this.trimDate(this.replaceExtension(item))] = item)
    );
    return slugToPath;
  }

  trimDate(path: string) {
    return path.slice(11, path.length);
  }

  replaceExtension(slug: string) {
    return slug.replace(/\.md$/, "");
  }

  getPostBySlug(slug, fields: (keyof IMarkdownPost)[]): IMarkdownPost {
    // find matching
    const foundPath = this.slugsToPaths[slug];
    // join pathname with directory
    const fullPath = join(this.directory, foundPath);
    // read file
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data, content } = matter(fileContents);

    const items = {
      slug: slug,
      path: foundPath,
    };

    fields.forEach((field) => {
      if (field === "slug") return;
      if (field === "path") return;
      if (field === "content") items[field] = content;

      if (data[field]) items[field] = data[field];
    });

    return {
      ...items,
    } as IMarkdownPost;
  }

  getPreviousAndNextPosts(slug: string) {
    const slugs = Object.keys(this.slugsToPaths);
    const indexOfPost = slugs.indexOf(slug);

    const previousPost =
      indexOfPost > 0
        ? this.getPostBySlug(slugs[indexOfPost - 1], ["title"])
        : null;
    const nextPost =
      indexOfPost !== slugs.length - 1
        ? this.getPostBySlug(slugs[indexOfPost + 1], ["title"])
        : null;

    return { previousPost, nextPost };
  }

  getAllPosts(fields: (keyof IMarkdownPost)[]) {
    // reverse to get newest first
    const slugs = Object.values(this.pathsToSlugs).reverse();

    return slugs.map((slug) => this.getPostBySlug(slug, fields));
  }

  getPostList() {
    return this.getAllPosts(["title", "author", "tags", "excerpt"]);
  }
}

export const GistsService = new MarkdownService(gistsDirectory);
export const PostsService = new MarkdownService(postsDirectory);
```
