import Head from "next/head";
import PostsService from "@utils/posts.service";
import Post from "@components/posts/Post";
import { GetStaticProps } from "next";
import PageContainer from "@components/template/PageContainer";
import TransparentHero from "@components/template/hero/TransparentHero";

export default function Blog({ posts }) {
  return (
    <>
      <Head>
        <title>Blog | fmonper</title>
      </Head>

      <TransparentHero
        title="Blog"
        subtitle="1 new post per year if you're lucky"
      />
      <PageContainer>
        <div className="space-y-4">
          {posts.map((entry) => {
            const p = entry.fields;
            return (
              <Post
                entry={entry}
                key={entry.sys.id}
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

export const getStaticProps: GetStaticProps = async () => {
  const res = await PostsService.fetchEntries();

  return {
    props: {
      posts: res,
    },
  };
};
