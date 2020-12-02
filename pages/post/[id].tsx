import Head from "next/head";
import PostsService from "@utils/contentfulPosts";
import { GetServerSideProps } from "next/types";
import PageContainer from "@components/template/PageContainer";
import { useEffect } from "react";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import Title from "@components/atoms/Title";
import Divider from "@components/atoms/Divider";
import marked from "marked";

export default function PostPage({ post }) {
  const parsedBody = documentToHtmlString(post.fields.body);
  const getParsedBody = () => {
    const rawMarkup = marked(post.fields.body, { sanitize: true });
    return { __html: rawMarkup };
  };
  return (
    <div className="container">
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
            <div dangerouslySetInnerHTML={getParsedBody()} />
            {post.fields.tags.map((tag) => (
              <>{tag.fields.title}</>
            ))}
            <pre>{JSON.stringify(post, null, 2)}</pre>
          </div>
        </PageContainer>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await PostsService.getPostById(String(context.params.id));
  console.log(res);

  return {
    props: {
      post: res,
    },
  };
};
