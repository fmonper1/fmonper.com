import Title from "@components/atoms/Title";
import React from "react";
import Button from "@components/atoms/button/Button";
import Link from "next/link";
import LinkButton from "@components/atoms/button/LinkButton";

interface Props {
  entry: any;
  reverse?: boolean;
}
function PortfolioBannerItem({ entry, reverse }: Props) {
  const { title, description, previewUrl, stack } = entry?.fields;
  const { file } = entry?.fields?.cover.fields;

  return (
    <div
      className={`group flex flex-wrap ${
        reverse ? "md:flex-row-reverse" : ""
      } md:flex-nowrap space-y-8 md:space-y-0`}
    >
      <div className="w-full md:w-1/2 lg:w-2/5 flex items-center">
        <div className="space-y-4">
          <Title size={3} color="text-2xl md:text-3xl text-primary">
            {title}
          </Title>
          <p>{description}</p>
          {stack && (
            <p className="bg-white p-2 rounded-md">
              <span className="font-bold text-primary">Tech stack:</span>{" "}
              {stack}
            </p>
          )}
          <div className="flex box">
            {previewUrl && <LinkButton href={previewUrl}>Preview</LinkButton>}
          </div>
        </div>
      </div>
      <div
        className={`${
          reverse ? "md:mr-4" : "md:ml-4"
        } w-full md:w-1/2 lg:w-3/5 w-full relative flex items-end justify-end pb-10`}
      >
        {/** BEGIN MOBILE DISPLAY **/}
        <div
          className={`${
            reverse ? "md:mr-4" : "md:ml-4"
          } absolute transform -translate-x-10 translate-y-6 rounded-lg 
          shadow-xl hover:shadow-3xl transition-colors bg-secondary border-secondary
          flex flex-col items-center`}
          style={{
            borderWidth: "14px 4px 8px 4px",
          }}
        >
          <div
            className="rounded-lg bg-cover bg-top "
            style={{
              backgroundImage: `url(https:${file.url})`,
              height: "350px",
              width: "220px",
            }}
          />
          <div className="w-6 h-6 rounded-full bg-secondary-light shadow-lg mt-2" />
        </div>
        {/** END MOBILE DISPLAY **/}

        {/** BEGIN DESKTOP DISPLAY **/}
        <div
          className={`${
            reverse ? "md:mr-4" : "md:ml-4"
          } w-full bg-primary rounded-lg shadow-xl hover:shadow-3xl transition-colors border-primary
          `}
          style={{
            borderWidth: "10px",
          }}
        >
          <div className="flex space-x-1 pb-2 items-end">
            <div className="w-3 h-3 rounded-full bg-secondary-light shadow-lg" />
            <div className="w-3 h-3 rounded-full bg-secondary-light shadow-lg " />
          </div>
          <div
            className="rounded-lg bg-cover  bg-top"
            style={{
              backgroundImage: `url(https:${file.url})`,
              height: "400px",
            }}
          />
        </div>
      </div>
      {/** END DESKTOP DISPLAY **/}
    </div>
  );
}

export default PortfolioBannerItem;
