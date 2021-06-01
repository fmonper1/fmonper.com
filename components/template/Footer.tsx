import React from "react";
import PageContainer from "./PageContainer";

import Icon from "@mdi/react";
import { mdiGithub } from "@mdi/js";

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
            <div>fmonper.com 2021</div>
          </div>
          <div className={columnStyle}>
            <p>
              Built with NextJS + Contentful -{" "}
              <span className="inline-flex">
                <Icon path={mdiGithub} size={1} /> Repo
              </span>
            </p>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
};

export default Footer;
