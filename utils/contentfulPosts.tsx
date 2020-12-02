import { Entry, EntryCollection } from "contentful";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = require("contentful").createClient({
  space: space,
  accessToken: accessToken,
});

const PostsService = {
  async fetchEntries(): Promise<EntryCollection<any>> {
    const entries = await client.getEntries("post");
    if (entries.items) return entries.items;
  },

  async getPostById(id: String): Promise<Entry<any>> {
    const entry = await client.getEntry(id);
    if (entry.sys) return entry;
  },
};

export default PostsService;
