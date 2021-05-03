import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");
const gistsDirectory = join(process.cwd(), "_gists");

interface NavItem {
  title: string;
  slug: string;
}
export interface IMarkdownPost {
  title?: string;
  tags?: string[];
  slug?: string;
  content: string;
  nextPost?: NavItem;
  previousPost?: NavItem;
  image?: string;
  excerpt?: string;
}

class MarkdownService {
  readonly directory;

  constructor(directory: string) {
    this.directory = directory;
  }

  getPostSlugs() {
    return fs.readdirSync(this.directory);
  }

  getPostBySlug(slug, fields = []): IMarkdownPost {
    let realSlug = slug.replace(/\.md$/, "");

    let fullPath = join(this.directory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const items = {};

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
      if (field === "slug") {
        items[field] = realSlug;
      }
      if (field === "content") {
        items[field] = content;
      }

      if (field === "excerpt") {
        items[field] = content;
      }

      if (data[field]) {
        items[field] = data[field];
      }
    });

    return {
      ...items,
    } as IMarkdownPost;
  }

  getPreviousAndNextPosts(slug: string) {
    const realSlug = slug.replace(/\.md$/, "");

    const slugs = this.getPostSlugs();
    const fieldsToGet = ["title", "slug"];
    const indexOfPost = slugs.indexOf(`${realSlug}.md`);
    const previousPost = slugs[indexOfPost - 1]
      ? this.getPostBySlug(slugs[indexOfPost - 1], fieldsToGet)
      : null;
    const nextPost = slugs[indexOfPost + 1]
      ? this.getPostBySlug(slugs[indexOfPost + 1], fieldsToGet)
      : null;

    return { previousPost, nextPost };
  }

  getAllPosts(fields = []) {
    const slugs = this.getPostSlugs();
    return (
      slugs
        .map((slug) => this.getPostBySlug(slug, fields))
        // sort posts by date in descending order
        // @ts-ignore
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    );
  }

  getPostList() {
    return this.getAllPosts(["title", "slug", "author", "tags"]);
  }
}

export const GistsService = new MarkdownService(gistsDirectory);
export const PostsService = new MarkdownService(postsDirectory);
