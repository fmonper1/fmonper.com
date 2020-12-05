import Title from "@components/atoms/Title";
import React from "react";

function PortfolioBannerItem({ entry }) {
  console.log(entry);
  const { title } = entry.fields;
  const { file } = entry.fields.cover.fields;

  return (
    <div
      className="group flex h-72 bg-cover bg-top hover:bg-bottom rounded-lg shadow-xl hover:shadow-3xl transition transition-shadow duration-75 "
      style={{ backgroundImage: `url(https:${file.url})` }}
    >
      <div className="flex w-full flex-col space-y-2 justify-end bg-primary-main bg-opacity-80 opacity-0 rounded-lg group-hover:opacity-100 transition transition-all duration-75 p-4">
        <Title size={2} color="text-secondary-main">
          {title}
        </Title>
      </div>
    </div>
  );
}

export default PortfolioBannerItem;
