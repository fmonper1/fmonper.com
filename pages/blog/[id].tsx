import React from "react";
import Head from "next/head";
import PostsService from "@utils/posts.service";
import { GetStaticPaths, GetStaticProps } from "next/types";
import PageContainer from "@components/template/PageContainer";
import TransparentHero from "@components/template/hero/TransparentHero";
import useMarkdown from "../../hooks/useMarkdown";
import Button from "@components/atoms/Button";
import Title from "@components/atoms/Title";

export default function PostPage({ post }) {
  const html = useMarkdown(post?.fields.body);
  return (
    <>
      <Head>
        <title>{post?.fields.title} | fmonper</title>
      </Head>

      <main>
        <TransparentHero
          title={post?.fields.title}
          subtitle={post?.fields.subtitle}
        />

        <PageContainer className="my-8">
          <div
            id="post-entry"
            className="space-y-3"
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
          <div className="mt-8">
            <Title size={3}>Tags</Title>
            <div className="flex space-x-2 flex-wrap ">
              {post?.fields.tags?.map((tag) => (
                <Button key={tag.fields.title} className="my-2">
                  {tag.fields.title}
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

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await PostsService.getPostBySlug(String(context.params.id));

  return {
    props: {
      post: res,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const entries: any[] = await PostsService.fetchEntries();

  return {
    paths: entries?.map(({ fields }) => `/blog/${fields.slug}`) ?? [],
    fallback: true,
  };
};
