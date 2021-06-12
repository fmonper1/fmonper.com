import React from "react";
import Title from "@components/atoms/Title";
import Divider from "@components/atoms/Divider";
import Link from "next/link";
import { mdiLanguageTypescript, mdiReact } from "@mdi/js";
import Icon from "@mdi/react";

const getIcon = (tag: string): any => {
  switch (tag) {
    case "typescript":
      return mdiLanguageTypescript;
    case "react":
      return mdiReact;
  }
};
const GistList = ({ gists }) => {
  return (
    <>
      <div className="flex items-center space-x-4">
        <Divider />
        <Title size={4} color="text-secondary-main">
          Gists
        </Title>
      </div>
      <Title size={2} className="mb-4">
        Stuff I reuse
      </Title>
      <div className="space-y-2 w-full flex flex-col">
        {gists.map((entry, i) => (
          <div
            className="group w-full transition rounded-sm hover:shadow-lg  hover:bg-white p-2 my-1"
            key={i}
          >
            <Link href={`snippets/${entry.slug}`}>
              <a href={`snippets/${entry.slug}`}>
                <div className="flex items-center">
                  <div className="mr-3 transition-colors bg-primary-main group-hover:bg-secondary text-white group-focus:text-secondary m-1 rounded-sm">
                    <div className="rounded-sm text-sm p-1">
                      <Icon path={getIcon(entry.tags[0])} size={0.85} />
                    </div>
                  </div>
                  <Title size={3}>{entry.title}</Title>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default GistList;
