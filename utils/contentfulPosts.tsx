import * as contentful from "contentful";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

/*
 * https://contentful.github.io/contentful.js/contentful/7.15.1/
 */
const client = contentful.createClient({
  space: space,
  accessToken: accessToken,
});

const PostsService = {
  async fetchEntries() {
    const entries = await client.getEntries({
      content_type: "post",
    });
    if (entries.items) return entries.items;
  },

  async getPostById(id: string) {
    const entry = await client.getEntry(id);
    if (entry.sys) return entry;
  },

  async getPostBySlug(slug: string) {
    const entry = await client.getEntries({
      content_type: "post",
      "fields.slug[match]": slug,
      include: 1,
    });
    return entry.items[0];
  },
};

export default PostsService;
