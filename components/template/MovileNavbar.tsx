import React, { useEffect } from "react";
import Link from "next/link";
import Icon from "@mdi/react";
import { mdiBlogger, mdiBriefcase, mdiClose, mdiHome } from "@mdi/js";
import Button from "../atoms/Button";

interface Props {
  toggleNavbar: () => void;
}
interface LinkProps {
  href: string;
  children?;
  className?: string;
  props?;
  onClick?: (e) => any;
}
const MyLink = ({ href, children, className, ...props }: LinkProps) => (
  <Link href={href}>
    <a
      className={`text-white transition-colors duration-100 rounded-md p-2 flex ${
        className ?? "hover:bg-primary-light"
      }`}
      {...props}
      href={href}
    >
      {children}
    </a>
  </Link>
);
const MobileNavbar = ({ toggleNavbar }: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);
  return (
    <div className="w-full flex flex-col space-y-4 p-4">
      <div className="flex justify-end" style={{ height: 40 }}>
        <Button onClick={toggleNavbar}>
          <Icon path={mdiClose} size={1} />{" "}
        </Button>
      </div>

      {/*<div className="relative">*/}
      {/*  <LanguageSelector />*/}
      {/*</div>*/}

      <MyLink href="/">
        <Icon path={mdiHome} size={1} /> Home
      </MyLink>
      <MyLink href="/blog">
        <Icon path={mdiBlogger} size={1} /> Blog
      </MyLink>
      <MyLink href="/projects">
        <Icon path={mdiBriefcase} size={1} /> Projects
      </MyLink>
    </div>
  );
};

export default MobileNavbar;
