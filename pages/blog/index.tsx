import Head from "next/head";
import { GetStaticProps } from "next";
import PageContainer from "@components/template/PageContainer";
import TransparentHero from "@components/template/hero/TransparentHero";
import { PostsService } from "../../services/markdown.service";
import MarkdownPost from "@components/posts/MarkdownPost";
import React from "react";

export default function Blog({ posts }) {
  return (
    <>
      <Head>
        <title>Blog | fmonper</title>
      </Head>

      <TransparentHero
        title="Blog"
        subtitle="one new post per year... if you're lucky"
      />
      <PageContainer>
        <div className="space-y-4">
          {posts.map((entry, i) => (
            <MarkdownPost entry={entry} key={i} />
          ))}
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
