import Head from "next/head";
import PostsService from "@utils/contentfulPosts";
import Post from "@components/posts/Post";
import { GetServerSideProps, GetStaticProps } from "next";
import Link from "next/link";
import PageContainer from "@components/template/PageContainer";
import Title from "@components/atoms/Title";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";
import TransparentHero from "@components/template/hero/TransparentHero";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Next + Contentful Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TransparentHero>
        <Title size={1} color="text-white" className="my-8">
          Hi, my name is{" "}
          <span className="text-secondary-main">Fernando Montero.</span>
        </Title>
        <Title size={2} color="text-white" className="mb-8">
          I'm a <span className="text-secondary-main">software engineer</span>{" "}
          and <span className="text-secondary-main">full-stack</span> developer.
        </Title>
      </TransparentHero>
      <PageContainer>
        <div className="flex justify-center text-center py-8">
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
            width="64px"
          ></img>
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg"
            width="64px"
          ></img>
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg"
            width="64px"
          ></img>
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg"
            width="64px"
          ></img>
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg"
            width="64px"
          ></img>
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg"
            width="64px"
          ></img>
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg"
            width="64px"
          ></img>
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
            width="64px"
          ></img>
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg"
            width="64px"
          ></img>
          <img
            src="https://raw.githubusercontent.com/devicons/devicon/master/icons/gitlab/gitlab-original.svg"
            width="64px"
          ></img>
        </div>
      </PageContainer>
      <PageContainer>
        <Title size={2}>
          <Link href="/blog">
            <a href="/blog" className="underline-link">
              From the blog »
            </a>
          </Link>
        </Title>
        <div className="space-y-4">
          {posts.map((entry) => {
            const p = entry.fields;
            return (
              <Post
                entry={entry}
                key={entry.sys.id}
                date={p.date}
                image={p.image?.fields}
                title={p.title}
              />
            );
          })}
        </div>
      </PageContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await PostsService.fetchEntries();

  return {
    props: {
      posts: res,
    },
  };
};
