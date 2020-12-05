import React from "react";
import PageContainer from "./PageContainer";

import Icon from "@mdi/react";
import { mdiGithub } from "@mdi/js";

const Footer = () => {
  const columnStyle = `w-full space-y-2 flex justify-center`;
  return (
    <footer className="bg-primary-main inverted-dots text-white mt-12">
      <PageContainer>
        <div className="flex flex-wrap space-y-8 my-4">
          <div className={columnStyle}>
            <img src="/logo.svg" alt="fmonper" width={80} />
          </div>

          <div className={columnStyle}>
            <div className="flex">
              Built with NextJS + Contentful -{" "}
              <span className="inline-flex">
                <Icon path={mdiGithub} size={1} /> Repo
              </span>
            </div>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
};

export default Footer;
