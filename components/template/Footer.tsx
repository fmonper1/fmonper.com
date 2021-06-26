import React from "react";
import PageContainer from "./PageContainer";

import Icon from "@mdi/react";
import { mdiGithub } from "@mdi/js";
import clsx from "clsx";

const Footer = () => {
  const columnStyle = ` w-full md:w-1/3 flex`;
  return (
    <footer className="bg-primary-main inverted-dots text-white mt-12">
      <PageContainer>
        <div className="flex flex-wrap space-y-8 md:space-y-0 my-4 w-full">
          <div className="w-full md:w-1/6 space-y-2 flex justify-center">
            <img src="/logo.svg" alt="fmonper" width={80} />
          </div>

          <div className={columnStyle}>
            <div>
              <ul className="space-y-4">
                <li>
                  <a href="/">home</a>
                </li>
                <li>
                  <a href="blog">blog</a>
                </li>
                <li>
                  <a href="projects">projects</a>
                </li>
              </ul>
            </div>
          </div>
          <div className={clsx(columnStyle, "flex flex-col space-y-4")}>
            <div>Built with NextJS + Contentful</div>
            <div>
              <a
                href="https://github.com/fmonper1/fmonper.com-nextjs"
                target="_blank"
              >
                <span className="inline-flex">
                  <Icon path={mdiGithub} size={1} /> Repo
                </span>
              </a>
            </div>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
};

export default Footer;
