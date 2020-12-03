import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import PostsService from "@utils/contentfulPosts";
import { GetServerSideProps } from "next/types";
import PageContainer from "@components/template/PageContainer";
import TransparentHero from "@components/template/hero/TransparentHero";
import useMarkdown from "../../hooks/useMarkdown";

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

        <PageContainer>
          <div
            id="post-entry"
            className="space-y-2"
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
          {post.fields.tags?.map((tag) => (
            <Fragment key={tag.fields.title}>{tag.fields.title}</Fragment>
          ))}
          <pre>{JSON.stringify(post, null, 2)}</pre>
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
