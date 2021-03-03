import React, { useEffect, useState } from "react";
import Title from "@components/atoms/Title";
import PortfolioBannerItem from "@components/portfolio/PortfolioBannerItem";
import Divider from "@components/atoms/Divider";
import Slider from "@components/atoms/Slider";
import useWindowSize from "../../../hooks/useWindowSize";

const chunkArray = (array, chunkSize = 10) => {
  if (!array) return;
  const chunkArray = [];
  let chunk;
  for (let i = 0; i < array.length; i += chunkSize) {
    chunk = array.slice(i, i + chunkSize);
    chunkArray.push(chunk);
  }
  return chunkArray;
};

const PortfolioList = ({ items }) => {
  const [pagedItems, setPagedItems] = useState([]);
  const { width, isXs, isSm } = useWindowSize();

  useEffect(() => {
    const itemsPerPage = isXs ? 1 : isSm ? 2 : 3;
    setPagedItems(chunkArray(items, itemsPerPage));
  }, [width]);

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
      <div>
        <Slider>
          {pagedItems.map((page, i) => (
            <div className="flex sm:space-x-4" key={i}>
              {page.map((entry, i) => (
                <div className="w-full sm:w-1/2 md:w-1/3" key={i}>
                  <PortfolioBannerItem entry={entry} />
                </div>
              ))}
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default PortfolioList;
