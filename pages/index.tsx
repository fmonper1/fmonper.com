import Head from "next/head";
import PostsService from "@utils/contentfulPosts";
import Post from "@components/posts/Post";
import { GetServerSideProps } from "next";
import Link from "next/link";
import PageContainer from "@components/template/PageContainer";
import Title from "@components/atoms/Title";
import TransparentHero from "@components/template/hero/TransparentHero";
import Button from "@components/atoms/Button";
import Icon from "@mdi/react";
import { mdiGithub, mdiLinkedin } from "@mdi/js";
import Card from "@components/cards/Card";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Inicio | fmonper</title>
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
        <div className="mb-8 flex">
          <Link href="https://www.linkedin.com/in/fmonper1/">
            <a href="https://www.linkedin.com/in/fmonper1/">
              <Button className="flex mr-4">
                <Icon path={mdiLinkedin} size={1} className="mr-2" /> LinkedIn
              </Button>
            </a>
          </Link>
          <Link href="https://www.github.com/fmonper1/">
            <a href="https://www.github.com/fmonper1/">
              <Button style="link" className="flex">
                <Icon path={mdiGithub} size={1} className="mr-2" /> Github
              </Button>
            </a>
          </Link>
        </div>
      </TransparentHero>
      <PageContainer>
        <div className="flex flex-wrap md:flex-nowrap space-y-4 md:space-y-0 md:space-x-4 my-8">
          <div className="w-full md:w-1/3 flex">
            <Card title="Front" withDivider>
              <div className="flex justify-between">
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
                  width="64px"
                />
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg"
                  width="64px"
                />
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg"
                  width="64px"
                />
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg"
                  width="64px"
                />
              </div>
            </Card>
          </div>
          <div className="w-full md:w-1/3 flex">
            <Card title="Back" withDivider>
              <div className="flex justify-between">
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/develop/icons/nestjs/nestjs-plain.svg"
                  width="64px"
                />
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg"
                  width="64px"
                />
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg"
                  width="64px"
                />

                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg"
                  width="64px"
                />
              </div>
            </Card>
          </div>
          <div className="w-full md:w-1/3 flex">
            <Card className="bg-primary-main py-8">
              <div className="flex flex-col items-center  justify-around h-full">
                <Title size={2} color="text-white">
                  Check out my work
                </Title>
                <Button>Portfolio</Button>
              </div>
            </Card>
          </div>
        </div>
      </PageContainer>
      <PageContainer>
        <Title size={2} className="mb-4">
          <Link href="/blog">
            <a
              href="/blog"
              className=" text-primary-main hover:text-background-light underline-link"
            >
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
