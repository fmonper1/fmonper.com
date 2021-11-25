import Head from "next/head";
import { GetStaticProps } from "next";
import PageContainer from "@components/template/PageContainer";
import Title from "@components/atoms/Title";
import TransparentHero from "@components/template/hero/TransparentHero";
import Icon from "@mdi/react";
import { mdiGithub, mdiLinkedin } from "@mdi/js";
import PostList from "@components/sections/index/PostList";
import CardSection from "@components/sections/index/CardSection";
import PortfolioList from "@components/sections/index/PortfoliotList";
import GistList from "@components/sections/index/GistList";
import { GistsService, PostsService } from "../services/markdown.service";
import PortfolioService from "../services/portfolio.service";
import GithubService from "../services/github.service";
import React from "react";
import RepoList from "@components/sections/index/RepoList";
import FadeIn from "@components/atoms/FadeIn";
import LinkButton from "@components/atoms/button/LinkButton";

export default function Home({ posts, gists, portfolio, repos }) {
  return (
    <>
      <Head>
        <title>Inicio | fmonper</title>
      </Head>
      <main className="space-y-8 md:space-y-10">
        <TransparentHero>
          <Title size={1} color="text-white" className="my-8">
            Hi, my name is <span className="text-secondary-main">Fernando</span>
          </Title>
          <Title size={2} color="text-white" className="mb-4">
            I'm a <span className="">software</span> engineer and fullstack{" "}
            <span className="hero__typescript">typescript</span> developer.
          </Title>
          <Title size={2} color="text-white" className="mb-8">
            Currently, I'm working full-time at{" "}
            <span className="hero__engineer">Dekalabs</span> as a Software Engineer.
          </Title>
          <div className="mb-8 flex space-x-4">
            <LinkButton href="https://www.linkedin.com/in/fmonper1/">
              <Icon path={mdiLinkedin} size={1} className="mr-2" /> LinkedIn
            </LinkButton>
            <LinkButton href="https://www.github.com/fmonper1/">
              <Icon path={mdiGithub} size={1} className="mr-2" /> Github
            </LinkButton>
          </div>
        </TransparentHero>
        {/*<PageContainer>*/}
        {/*  <FadeIn>*/}
        {/*    <CardSection />*/}
        {/*  </FadeIn>*/}
        {/*</PageContainer>*/}
        <PageContainer>
          <FadeIn>
            <PostList posts={posts} />
          </FadeIn>
        </PageContainer>
        <PageContainer>
          <FadeIn>
            <div className="space-y-10 md:space-y-0 md:space-x-4 flex flex-wrap md:flex-nowrap">
              <div className="w-full md:w-1/2 ">
                <GistList gists={gists} />
              </div>
              <div className="w-full md:w-1/2 ">
                <RepoList repos={repos} />
              </div>
            </div>
          </FadeIn>
        </PageContainer>
        <PageContainer>
          <PortfolioList items={portfolio} />
        </PageContainer>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await PostsService.getPostList();
  const gists = await GistsService.getPostList();
  // const posts = await MDPostsService.getPostList();
  const portfolio = PortfolioService;
  const repos = await GithubService.getRepos();

  return {
    props: {
      posts,
      portfolio,
      gists,
      repos,
    },
  };
};
