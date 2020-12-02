import Head from "next/head";
import PostsService from "@utils/contentfulPosts";
import Post from "@components/Posts/Post";
import { GetStaticProps } from "next";
import PageContainer from "@components/template/PageContainer";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Next + Contentful Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer>
        <div className="posts">
          {posts.map((entry) => {
            const p = entry.fields;
            return (
              <Post
                entry={entry}
                key={entry.sys.id}
                date={p.date}
                image={p.image?.fields}
                title={p.title}
              />
            );
          })}
        </div>
      </PageContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await PostsService.fetchEntries();
  console.log(res);

  return {
    props: {
      posts: res,
    },
  };
};
