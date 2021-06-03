import Head from "next/head";
import { GetStaticProps } from "next";
import PageContainer from "@components/template/PageContainer";
import TransparentHero from "@components/template/hero/TransparentHero";
import PortfolioService from "../../services/portfolio.service";
import PortfolioBannerItem from "@components/portfolio/PortfolioBannerItem";
import React from "react";
import FadeIn from "@components/atoms/FadeIn";

export default function Portfolio({ portfolio }) {
  return (
    <>
      <Head>
        <title>Projects | fmonper</title>
      </Head>
      <div className="space-y-8 md:space-y-10">
        <TransparentHero title="Projects" subtitle="Stuff I've worked on" />

        <PageContainer>
          <div className="space-y-16 ">
            {portfolio.map((entry, i) => (
              <div className="w-full" key={i}>
                <FadeIn>
                  <PortfolioBannerItem entry={entry} reverse={i % 2 !== 0} />
                </FadeIn>
              </div>
            ))}
          </div>
        </PageContainer>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const portfolio = PortfolioService;

  return {
    props: {
      portfolio,
    },
  };
};
