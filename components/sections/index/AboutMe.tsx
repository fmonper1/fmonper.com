import React from "react";
import Card from "@components/cards/Card";
import Title from "@components/atoms/Title";
import Button from "@components/atoms/Button";

const AboutMeSection = () => {
  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full">
          <Card title="Who am I?" withDivider>
            <div className="w-full flex">
              <div></div>
              <img src="face.jpg" alt="Im Fernando Montero" />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default AboutMeSection;
