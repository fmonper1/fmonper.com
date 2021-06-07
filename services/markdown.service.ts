import fs from "fs";
import { join } from "path";
import * as matter from "gray-matter";

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
