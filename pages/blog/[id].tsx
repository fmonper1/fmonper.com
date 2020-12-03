import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import PostsService from "@utils/contentfulPosts";
import { GetServerSideProps } from "next/types";
import PageContainer from "@components/template/PageContainer";
import Title from "@components/atoms/Title";
import marked, { Renderer } from "marked";
import * as prism from "prismjs";
import { renderToString } from "react-dom/server";
import TransparentHero from "@components/template/hero/TransparentHero";
import Icon from "@mdi/react";
import { mdiOpenInNew } from "@mdi/js";
import DOMPurify from "dompurify";

export default function PostPage({ post }) {
  const [html, setHtml] = useState("");
  useEffect(() => {
    const renderer: Renderer = ({
      link(href, title, text) {
        return renderToString(
          <Link href={href}>
            <a
              href={href}
              className="inline-flex items-end text-primary-main underline"
            >
              {text}
              <Icon path={mdiOpenInNew} size={0.75} />
            </a>
          </Link>
        );
      },
      heading(text, level) {
        const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
        return renderToString(
          <Title size={level}>
            <>
              <a className="anchor" href={`#${escapedText}`}>
                <span className="mr-2">#</span>
              </a>
              {text}
            </>
          </Title>
        );
      },
    } as unknown) as Renderer;
    marked.use({ renderer });
    setHtml(DOMPurify.sanitize(marked(post.fields.body)));
  }, []);
  useEffect(() => {
    if (html === "") return;
    prism.highlightAll();
  }, [html]);

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
