import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

interface NavItem {
  title: string;
  slug: string;
}
export interface IMarkdownPost {
  title?: string;
  slug?: string;
  content: string;
  nextPost?: NavItem;
  previousPost?: NavItem;
}

const MarkdownService = {
  getPostSlugs() {
    return fs.readdirSync(postsDirectory);
  },

  getPostBySlug(slug, fields = []): IMarkdownPost {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(postsDirectory, `${realSlug}.md`);
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

      if (data[field]) {
        items[field] = data[field];
      }
    });

    return {
      ...items,
    } as IMarkdownPost;
  },

  getPreviousAndNextPosts(slug: string) {
    const realSlug = slug.replace(/\.md$/, "");

    const slugs = MarkdownService.getPostSlugs();
    const fieldsToGet = ["title", "slug"];
    const indexOfPost = slugs.indexOf(`${realSlug}.md`);
    const previousPost = slugs[indexOfPost - 1]
      ? this.getPostBySlug(slugs[indexOfPost - 1], fieldsToGet)
      : null;
    const nextPost = slugs[indexOfPost + 1]
      ? this.getPostBySlug(slugs[indexOfPost + 1], fieldsToGet)
      : null;

    return { previousPost, nextPost };
  },

  getAllPosts(fields = []) {
    const slugs = MarkdownService.getPostSlugs();
    return (
      slugs
        .map((slug) => MarkdownService.getPostBySlug(slug, fields))
        // sort posts by date in descending order
        // @ts-ignore
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    );
  },

  getPostList() {
    return MarkdownService.getAllPosts(["title", "slug", "author", "tags"]);
  },
};

export default MarkdownService;
