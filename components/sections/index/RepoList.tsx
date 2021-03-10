import React from "react";
import Title from "@components/atoms/Title";
import Divider from "@components/atoms/Divider";
import Link from "next/link";
import { mdiGithub, mdiLanguageTypescript, mdiReact } from "@mdi/js";
import Icon from "@mdi/react";

const getIcon = (tag: string): any => {
  switch (tag) {
    case "typescript":
      return mdiLanguageTypescript;
    case "react":
      return mdiReact;
  }
};
const RepoList = ({ repos }) => {
  return (
    <>
      <div className="flex items-center space-x-4">
        <Divider />
        <Title size={4} color="text-secondary-main">
          Repos
        </Title>
      </div>
      <Title size={2} className="mb-4">
        Stuff In my GitHub
      </Title>
      <div className="space-y-2 w-full flex flex-col">
        {repos.slice(0, 5).map((entry, i) => (
          <div className="group w-full " key={i}>
            <Link href={entry.html_url}>
              <a href={entry.html_url} target="_blank" rel="noreferrer">
                <div className="flex mt-4 items-center">
                  <div className=" transition-colors bg-primary-main group-hover:bg-secondary text-white m-1 rounded-sm">
                    <div className="rounded-sm text-sm p-1">
                      <Icon path={mdiGithub} size={0.85} />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <Title size={3}>{entry.name}</Title>
                    {entry.description}
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default RepoList;
