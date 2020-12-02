import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import PostsService from "@utils/contentfulPosts";
import { GetServerSideProps } from "next/types";
import PageContainer from "@components/template/PageContainer";
import Title from "@components/atoms/Title";
import Divider from "@components/atoms/Divider";
import marked, { Renderer } from "marked";
import * as prism from "prismjs";
import { renderToString } from "react-dom/server";
import TransparentHero from "@components/template/hero/TransparentHero";

export default function PostPage({ post }) {
  useEffect(() => {
    prism.highlightAll();
  }, []);
  const renderer: Renderer = ({
    heading(text, level) {
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
      return renderToString(
        <Title size={level}>
          <>
            <a className="anchor" href={`#${escapedText}`}>
              <span className="header-link">#</span>
            </a>
            {text}
          </>
        </Title>
      );
    },
  } as unknown) as Renderer;
  marked.use({ renderer });
  const getParsedBody = {
    __html: marked(post.fields.body, { sanitize: true }),
  };
  return (
    <>
      <Head>
        <title>Next + Contentful Starter</title>
        <link rel="icon" href="/favicon.ico" />
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
            dangerouslySetInnerHTML={getParsedBody}
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
