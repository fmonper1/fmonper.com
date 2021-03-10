import Head from "next/head";
import { GetStaticProps } from "next";
import PageContainer from "@components/template/PageContainer";
import TransparentHero from "@components/template/hero/TransparentHero";
import PortfolioService from "../../services/portfolio.service";
import PortfolioBannerItem from "@components/portfolio/PortfolioBannerItem";
import React from "react";

export default function Portfolio({ portfolio }) {
  return (
    <>
      <Head>
        <title>Projects | fmonper</title>
      </Head>
      <div className="space-y-8 md:space-y-10">
        <TransparentHero title="Projects" subtitle="Stuff I've worked on" />

        <PageContainer>
          <div className="flex flex-wrap">
            {portfolio.map((entry) => (
              <div className="w-full sm:w-1/2 md:w-1/3 p-3">
                <PortfolioBannerItem entry={entry} />
              </div>
            ))}
          </div>
        </PageContainer>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const portfolio = await PortfolioService.fetchEntries();

  return {
    props: {
      portfolio,
    },
  };
};
