import React from "react";
import Head from "next/head";
import PostsService from "@utils/posts.service";
import { GetServerSideProps } from "next/types";
import PageContainer from "@components/template/PageContainer";
import TransparentHero from "@components/template/hero/TransparentHero";
import useMarkdown from "../../hooks/useMarkdown";
import Button from "@components/atoms/Button";

export default function PostPage({ post }) {
  const html = useMarkdown(post.fields.body);

  return (
    <>
      <Head>
        <title>{post.fields.title} | fmonper</title>
      </Head>

      <main>
        <TransparentHero
          title={post.fields.title}
          subtitle={post.fields.subtitle}
        />

        <PageContainer className="my-8">
          <div
            id="post-entry"
            className="space-y-3 md:text-lg"
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
          <div className="flex space-x-2 mt-8">
            <div className="p-2 text-primary-main">Tags:</div>
            {post.fields.tags?.map((tag) => (
              <Button key={tag.fields.title}>{tag.fields.title}</Button>
            ))}
          </div>
          {/*<pre>{JSON.stringify(post, null, 2)}</pre>*/}
        </PageContainer>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await PostsService.getPostBySlug(String(context.params.id));

  return {
    props: {
      post: res,
    },
  };
};
