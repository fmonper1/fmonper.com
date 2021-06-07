import Head from "next/head";
import Post from "@components/posts/Post";
import { GetStaticProps } from "next";
import PageContainer from "@components/template/PageContainer";
import TransparentHero from "@components/template/hero/TransparentHero";
import { PostsService } from "../../services/markdown.service";
import PostMD from "@components/posts/PostMD";

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
            return <PostMD entry={entry} />;
          })}
        </div>
      </PageContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await PostsService.getPostList();

  return {
    props: {
      posts: res,
    },
  };
};
