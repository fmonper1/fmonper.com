import Head from "next/head";
import PostsService from "@utils/contentfulPosts";
import Post from "@components/posts/Post";
import { GetStaticProps } from "next";
import Link from "next/link";
import PageContainer from "@components/template/PageContainer";
import Title from "@components/atoms/Title";
import TransparentHero from "@components/template/hero/TransparentHero";

export default function Blog({ posts }) {
  return (
    <>
      <Head>
        <title>Next + Contentful Starter</title>
        <link rel="icon" href="/favicon.ico" />
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
