import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Icon from "@mdi/react";
import {
  mdiAccount,
  mdiArrowRight,
  mdiClose,
  mdiHelpCircle,
  mdiHome,
  mdiLock,
  mdiLogout,
} from "@mdi/js";
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
  const { t } = useTranslation("common");
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

      <MyLink href="/preguntas-frecuentes">
        <Icon path={mdiHome} size={1} className="mr-4" />
        {t("navbar.home")}
      </MyLink>

      <MyLink href="/">
        <Icon path={mdiHelpCircle} size={1} className="mr-4" />
        {t("navbar.faq")}
      </MyLink>

      <MyLink
        href="/transferir-vehiculo"
        className="bg-secondary-main hover:bg-secondary-light"
      >
        {t("navbar.transfer")}
        <Icon path={mdiArrowRight} size={1} />
      </MyLink>

      <MyLink
        href="#"
        onClick={(e) => e.preventDefault()}
        className="text-gray-600  cursor-auto"
      >
        <Icon path={mdiLock} size={1} className="mr-4" />
        {t("navbar.informeDGT")}
      </MyLink>
    </div>
  );
};

export default MobileNavbar;
