import React from "react";
import Title from "@components/atoms/Title";
import PortfolioBannerItem from "@components/portfolio/PortfolioBannerItem";
import Divider from "@components/atoms/Divider";
import useWindowSize from "../../../hooks/useWindowSize";
import FadeIn from "@components/atoms/FadeIn";

// const chunkArray = (array, chunkSize = 10) => {
//   if (!array) return;
//   const chunkArray = [];
//   let chunk;
//   for (let i = 0; i < array.length; i += chunkSize) {
//     chunk = array.slice(i, i + chunkSize);
//     chunkArray.push(chunk);
//   }
//   return chunkArray;
// };

const PortfolioList = ({ items }) => {
  const { width, isXs, isSm } = useWindowSize();

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
      <div className="space-y-16 ">
        {items.map((entry, i) => (
          <div className="w-full" key={i}>
            <FadeIn>
              <PortfolioBannerItem entry={entry} reverse={i % 2 !== 0} />
            </FadeIn>
          </div>
        ))}
      </div>
    </>
  );
};

export default PortfolioList;
