import React, { useEffect } from "react";
import Link from "next/link";
import Icon from "@mdi/react";
import { mdiBlogger, mdiBriefcase, mdiClose, mdiHome } from "@mdi/js";
import Button from "../atoms/button/Button";
import FadeIn from "@components/atoms/FadeIn";

interface LinkProps {
  href: string;
  children?;
  className?: string;
  props?;
  icon: any;
  onClick?: (e) => any;
}
const MyLink = ({ href, children, className, icon, ...props }: LinkProps) => (
  <Link href={href}>
    <a
      className={`text-white transition-colors duration-100 rounded-md p-2 flex ${
        className ?? "hover:bg-primary-light"
      }`}
      {...props}
      href={href}
    >
      <Icon path={icon} size={1} className="mr-2" />
      {children}
    </a>
  </Link>
);
const MobileNavbar = () => {
  return (
    <div className="w-full flex flex-col space-y-2 p-4">
      {/*<div className="relative">*/}
      {/*  <LanguageSelector />*/}
      {/*</div>*/}

      <MyLink href="/" icon={mdiHome}>
        Home
      </MyLink>
      <MyLink href="/blog" icon={mdiBlogger}>
        Blog
      </MyLink>
      <MyLink href="/projects" icon={mdiBriefcase}>
        Projects
      </MyLink>
    </div>
  );
};

export default MobileNavbar;
