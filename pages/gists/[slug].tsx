import MarkdownService from "@utils/markdown.service";
import Head from "next/head";
import TransparentHero from "@components/template/hero/TransparentHero";
import PageContainer from "@components/template/PageContainer";
import Title from "@components/atoms/Title";
import Button from "@components/atoms/Button";
import React, { useEffect } from "react";
import MarkdownParser from "@utils/markdown.parser";
import * as prism from "prismjs";

export default function PostPage({ post }) {
  // const html = useMarkdown(post.content);
  useEffect(() => {
    prism.highlightAll();
  }, []);

  return (
    <>
      <Head>
        <title>{post?.title} | fmonper</title>
      </Head>

      <main>
        <TransparentHero title={post?.title} subtitle={post?.subtitle} />

        <PageContainer className="my-8">
          <div
            id="post-entry"
            className="space-y-3"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
          <div className="mt-8">
            <Title size={3}>Tags</Title>
            <div className="flex space-x-2 flex-wrap ">
              {post?.tags?.map((tag, i) => (
                <Button key={i} className="my-2">
                  {tag}
                </Button>
              ))}
            </div>
          </div>
          {/*<pre>{JSON.stringify(post, null, 2)}</pre>*/}
        </PageContainer>
      </main>
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = MarkdownService.getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "tags",
  ]);

  return {
    props: {
      post: {
        ...post,
        content: MarkdownParser.parse(post.content),
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = MarkdownService.getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          // @ts-ignore
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
