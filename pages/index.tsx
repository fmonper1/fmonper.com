import Head from "next/head";
import PostsService from "@utils/posts.service";
import { GetStaticProps } from "next";
import Link from "next/link";
import PageContainer from "@components/template/PageContainer";
import Title from "@components/atoms/Title";
import TransparentHero from "@components/template/hero/TransparentHero";
import Button from "@components/atoms/Button";
import Icon from "@mdi/react";
import { mdiGithub, mdiLinkedin } from "@mdi/js";
import PortfolioService from "@utils/portfolio.service";
import PostList from "@components/sections/index/PostList";
import CardSection from "@components/sections/index/CardSection";
import PortfolioList from "@components/sections/index/PortfoliotList";

export default function Home({ posts, portfolio }) {
  return (
    <>
      <Head>
        <title>Inicio | fmonper</title>
      </Head>
      <div className="space-y-8 md:space-y-10">
        <TransparentHero>
          <Title size={1} color="text-white" className="my-8">
            Hi, my name is{" "}
            <span className="text-secondary-main">Fernando Montero.</span>
          </Title>
          <Title size={2} color="text-white" className="mb-8">
            I'm a <span className="text-secondary-main">software engineer</span>{" "}
            and <span className="text-secondary-main">full-stack</span>{" "}
            developer.
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
          <CardSection />
        </PageContainer>
        <PageContainer>
          <PostList posts={posts} />
        </PageContainer>
        <PageContainer>
          <PortfolioList items={portfolio} />
        </PageContainer>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await PostsService.fetchEntries();
  const portfolio = await PortfolioService.fetchEntries();

  return {
    props: {
      posts,
      portfolio,
    },
  };
};
