import Head from "next/head";
import PostsService from "@utils/contentfulPosts";
import { GetServerSideProps } from "next/types";
import PageContainer from "@components/template/PageContainer";
import { Fragment, useEffect, useState } from "react";
import Title from "@components/atoms/Title";
import Divider from "@components/atoms/Divider";
import marked from "marked";
import * as prism from "prismjs";
import { renderToString } from "react-dom/server";

export default function PostPage({ post }) {
  useEffect(() => {
    prism.highlightAll();
  }, []);
  const renderer = {
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
  };
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
        <PageContainer>
          <div className="posts">
            <div className="text-center space-y-4">
              <Title size={1}>{post.fields.title}</Title>
              <Divider className="mx-auto" />
              <Title size={3}>{post.fields.subtitle}</Title>
            </div>
            <div id="post-entry" dangerouslySetInnerHTML={getParsedBody} />
            {post.fields.tags?.map((tag) => (
              <Fragment key={tag.fields.title}>{tag.fields.title}</Fragment>
            ))}
            <pre>{JSON.stringify(post, null, 2)}</pre>
          </div>
        </PageContainer>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await PostsService.getPostBySlug(String(context.params.id));
  console.log(res);

  return {
    props: {
      post: res,
    },
  };
};
