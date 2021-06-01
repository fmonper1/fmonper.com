import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import dayjs from "dayjs";

const postsDirectory = join(process.cwd(), "_posts");
const gistsDirectory = join(process.cwd(), "_gists");

interface NavItem {
  title: string;
  slug: string;
}
export interface IMarkdownPost {
  title: string;
  slug: string;
  path: string;
  date: string;
  content?: string;
  tags?: string[];
  nextPost?: NavItem;
  previousPost?: NavItem;
  image?: string;
  excerpt?: string;
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

  getPostPaths() {
    return fs.readdirSync(this.directory);
  }

  trimDate(path: string) {
    return path.slice(11, path.length);
  }

  replaceExtension(slug: string) {
    return slug.replace(/\.md$/, "");
  }

  getPostBySlug(slug, fields = []): IMarkdownPost {
    let realSlug = slug.replace(/\.md$/, "");
    const paths = this.getPostPaths();

    // find matching
    const foundPath = paths.filter((i) => i.indexOf(realSlug) > -1)[0];
    // join pathname with directory
    let fullPath = join(this.directory, foundPath);
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
    const realSlug = slug.replace(/\.md$/, "");

    const slugs = this.getPostPaths().map((i) => this.trimDate(i));
    console.log("slugs :", slugs);
    const fieldsToGet = ["title"];
    const indexOfPost = slugs.indexOf(`${realSlug}.md`);

    const previousPost =
      indexOfPost > 0
        ? this.getPostBySlug(slugs[indexOfPost - 1], fieldsToGet)
        : null;
    const nextPost =
      indexOfPost !== slugs.length - 1
        ? this.getPostBySlug(slugs[indexOfPost + 1], fieldsToGet)
        : null;

    console.log("previousPost :", previousPost);
    console.log("nextPost :", nextPost);

    return { previousPost, nextPost };
  }

  getAllPosts(fields = []) {
    console.log(this.slugsToPaths);
    console.log(this.pathsToSlugs);
    const slugs = this.getPostPaths().map((i) => this.trimDate(i));
    return (
      slugs
        .map((slug) => this.getPostBySlug(slug, fields))
        // sort posts by date in descending order
        // @ts-ignore
        .sort((post1, post2) =>
          dayjs(post1.date) > dayjs(post2.date) ? -1 : 1
        )
    );
  }

  getPostList() {
    return this.getAllPosts(["title", "author", "tags", "excerpt"]);
  }
}

export const GistsService = new MarkdownService(gistsDirectory);
export const PostsService = new MarkdownService(postsDirectory);
