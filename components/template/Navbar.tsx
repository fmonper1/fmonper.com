import React from "react";
import Link from "next/link";
import Icon from "@mdi/react";
import { mdiBlogger, mdiBriefcase, mdiHome } from "@mdi/js";

interface LinkProps {
  href: string;
  children?;
  className?: string;
  props?;
}
const MyLink = ({ href, children, className, ...props }: LinkProps) => (
  <Link href={href}>
    <a
      className={`text-white p-2 flex rounded-md hover:bg-primary-light space-x-2 ${className}`}
      {...props}
      href={href}
    >
      {children}
    </a>
  </Link>
);
const Navbar = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-2">
      <MyLink href="/">
        <Icon path={mdiHome} size={1} /> Home
      </MyLink>
      <MyLink href="/blog">
        <Icon path={mdiBlogger} size={1} /> Blog
      </MyLink>
      <MyLink href="/projects">
        <Icon path={mdiBriefcase} size={1} /> Projects
      </MyLink>
      {/*<MyLink*/}
      {/*  href="/transferir-vehiculo"*/}
      {/*  className="bg-secondary-main hover:bg-secondary-light transition-colors duration-100 rounded-md"*/}
      {/*>*/}
      {/*  {t("navbar.transfer")}*/}
      {/*  <Icon path={mdiArrowRight} size={1} />*/}
      {/*</MyLink>*/}
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
