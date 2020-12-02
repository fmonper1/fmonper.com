import Contentful, { Entry, EntryCollection } from "contentful";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

/*
 * https://contentful.github.io/contentful.js/contentful/7.15.1/
 */
const client = Contentful.createClient({
  space: space,
  accessToken: accessToken,
});

const PostsService = {
  async fetchEntries(): Promise<EntryCollection<any>> {
    const entries = await client.getEntries({
      content_type: "post",
    });
    if (entries.items) return entries.items;
  },

  async getPostById(id: String): Promise<Entry<any>> {
    const entry = await client.getEntry(id);
    if (entry.sys) return entry;
  },

  async getPostBySlug(slug: String): Promise<Entry<any>> {
    const entry = await client.getEntries({
      content_type: "post",
      "fields.slug[match]": slug,
      include: 1,
    });
    if (entry.sys) return entry.items[0];
  },
};

export default PostsService;
