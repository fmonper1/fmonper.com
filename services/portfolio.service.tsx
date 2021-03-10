import { client } from "@utils/contentful.main";
import { IPost } from "../@types/generated/contentful";

const PortfolioService = {
  async fetchEntries(): Promise<IPost[]> {
    const entries = await client.getEntries({
      content_type: "portfolio",
    });
    if (entries.items) return entries.items as IPost[];
  },

  async getPostById(id: string): Promise<IPost> {
    const entry = await client.getEntry(id);
    if (entry.sys) return entry as IPost;
  },

  async getPostBySlug(slug: string): Promise<IPost> {
    const entry = await client.getEntries({
      content_type: "post",
      "fields.slug[match]": slug,
      include: 1,
    });
    return entry.items[0] as IPost;
  },
};

export default PortfolioService;
