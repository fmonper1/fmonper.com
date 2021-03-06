import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

interface IMarkdownPost {
  content: string;
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

    return items as IMarkdownPost;
  },

  getAllPosts(fields = []) {
    const slugs = MarkdownService.getPostSlugs();
    const posts = slugs
      .map((slug) => MarkdownService.getPostBySlug(slug, fields))
      // sort posts by date in descending order
      // @ts-ignore
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
  },
  getPostList() {
    return MarkdownService.getAllPosts(["title", "slug", "author", "tags"]);
  },
};

export default MarkdownService;
