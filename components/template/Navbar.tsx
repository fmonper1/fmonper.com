import React, { useContext } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Icon from "@mdi/react";
import { mdiArrowRight, mdiHelpCircle, mdiLogout } from "@mdi/js";
import LanguageSelector from "./LanguageSelector";

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
  const { t } = useTranslation("common");
  return (
    <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-2">
      <MyLink href="/preguntas-frecuentes">
        <Icon path={mdiHelpCircle} size={1} /> {t("navbar.faq")}
      </MyLink>
      <div className="relative">
        <LanguageSelector />
      </div>
      <MyLink
        href="/transferir-vehiculo"
        className="bg-secondary-main hover:bg-secondary-light transition-colors duration-100 rounded-md"
      >
        {t("navbar.transfer")}
        <Icon path={mdiArrowRight} size={1} />
      </MyLink>
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
