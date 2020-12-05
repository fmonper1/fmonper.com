import React from "react";
import Card from "@components/cards/Card";
import Title from "@components/atoms/Title";
import Button from "@components/atoms/Button";

const CardSection = (props) => {
  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap space-y-4 md:space-y-0 md:space-x-4">
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
    </>
  );
};

export default CardSection;
