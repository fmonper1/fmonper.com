import { client } from "@utils/contentful.main";

const PortfolioService = {
  async fetchEntries() {
    const entries = await client.getEntries({
      content_type: "portfolio",
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

export default PortfolioService;
