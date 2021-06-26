import React from "react";
import Card from "@components/cards/Card";
import Title from "@components/atoms/Title";
import Button from "@components/atoms/button/Button";
import Link from "next/link";
import LinkButton from "@components/atoms/button/LinkButton";

const CardSection = (props) => {
  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-2/3 flex">
          <Card title="Tech" withDivider>
            <div className="flex-grow grid content-center grid-cols-4 md:grid-cols-8 gap-2">
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" />
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" />
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sass/sass-original.svg" />
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg" />
              <img src="https://raw.githubusercontent.com/devicons/devicon/develop/icons/nestjs/nestjs-plain.svg" />
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" />
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" />
              <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg" />
            </div>
          </Card>
        </div>

        <div className="w-full md:w-1/3 flex">
          <Card className="bg-primary-main py-4">
            <div className="flex flex-col items-center  justify-around h-full text-center space-y-4">
              <Title size={2} color="text-white">
                Check out my work
              </Title>
              <LinkButton href="/projects">Portfolio</LinkButton>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CardSection;
