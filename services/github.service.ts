import RequestManager from "./request.manager";
const ROOT_URL = "https://api.github.com";

const GithubService = {
  getRepos: async (): Promise<any[]> => {
    const { data } = await RequestManager.get(
      `${ROOT_URL}/users/fmonper1/repos`,
      {}
    );
    const sorted = data.sort((a, b) => {
      // @ts-ignore
      return new Date(b.created_at) - new Date(a.created_at);
    });
    return sorted;
  },
};

export default GithubService;
