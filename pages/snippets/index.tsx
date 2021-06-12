import Head from "next/head";
import { GetStaticProps } from "next";
import PageContainer from "@components/template/PageContainer";
import TransparentHero from "@components/template/hero/TransparentHero";
import { GistsService, PostsService } from "../../services/markdown.service";
import MarkdownPost from "@components/posts/MarkdownPost";
import React from "react";
import GistList from "@components/sections/index/GistList";

export default function Blog({ gists }) {
  return (
    <>
      <Head>
        <title>Blog | fmonper</title>
      </Head>

      <TransparentHero title="Gists" subtitle="Code I reuse" />
      <PageContainer>
        <div className="space-y-4">
          <GistList gists={gists} />
        </div>
      </PageContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await GistsService.getPostList();

  return {
    props: {
      gists: res,
    },
  };
};
