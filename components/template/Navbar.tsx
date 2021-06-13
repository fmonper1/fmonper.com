import React from "react";
import Link from "next/link";
import Icon from "@mdi/react";
import { mdiBlogger, mdiBriefcase, mdiCodeBraces, mdiHome } from "@mdi/js";
import { useRouter } from "next/router";

interface LinkProps {
  href: string;
  icon: string;
  children?;
  className?: string;
  props?;
}

const Navbar = () => {
  const { pathname } = useRouter();
  const MyLink = ({ href, children, className, icon, ...props }: LinkProps) => {
    return (
      <Link href={href}>
        <a
          className={`text-white p-2 flex rounded-md transition-colors hover:bg-primary-light focus:bg-primary-light space-x-2 ${
            pathname === href ? "text-secondary" : ""
          } ${className}`}
          {...props}
          href={href}
        >
          <Icon path={icon} size={1} className="mr-2" />

          {children}
        </a>
      </Link>
    );
  };
  return (
    <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-2">
      <MyLink href="/" icon={mdiHome}>
        Home
      </MyLink>
      <MyLink href="/blog" icon={mdiBlogger}>
        Blog
      </MyLink>
      <MyLink href="/projects" icon={mdiBriefcase}>
        Projects
      </MyLink>
      <MyLink href="/snippets" icon={mdiCodeBraces}>
        Snippets
      </MyLink>
    </div>
  );
};

export default Navbar;
