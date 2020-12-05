import React from "react";
import Title from "@components/atoms/Title";
import PortfolioBannerItem from "@components/portfolio/PortfolioBannerItem";
import Divider from "@components/atoms/Divider";

const PortfolioList = ({ items }) => {
  return (
    <>
      <div className="flex items-center space-x-4">
        <Divider />
        <Title size={4} color="text-secondary-main">
          Projects
        </Title>
      </div>
      <Title size={2} className="mb-4">
        Stuff I've worked on
      </Title>
      <div className="flex space-x-4">
        {items.map((entry) => (
          <div className="w-full sm:w-1/2 md:w-1/3">
            <PortfolioBannerItem entry={entry} />
          </div>
        ))}
      </div>
    </>
  );
};

export default PortfolioList;
