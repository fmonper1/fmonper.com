import * as React from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import Icon from "@mdi/react";
import { mdiClose, mdiMenu } from "@mdi/js";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MobileNavbar from "./MovileNavbar";
import clsx from "clsx";

const PageHeader = () => {
  const [show, setShow] = useState(false);
  const { route } = useRouter();

  useEffect(() => {
    setShow(false);
  }, [route]);

  const toggleNavbar = () => setShow(!show);

  return (
    <>
      <header className=" p-4 bg-primary-main inverted-dots">
        <div className="flex justify-between">
          <div className="w-auto flex items-center pl-0 ">
            <Link href="/">
              <a href="/">
                <img
                  src="/logo.svg"
                  width={40}
                  height={40}
                  className="hover:animate-bounce "
                />
              </a>
            </Link>
          </div>

          <div className="flex sm:hidden w-1/4 justify-end items-center">
            <a href="#" onClick={toggleNavbar}>
              <Icon
                path={show ? mdiClose : mdiMenu}
                size={1.5}
                className="text-white hover:text-secondary-main"
              />
            </a>
          </div>
          <div
            className={`hidden sm:flex flex-grow flex justify-end content-center pl-8`}
          >
            <Navbar />
          </div>
        </div>

        <div
          className={clsx(
            "transform transition-all",
            !show && "scale-y-0",
            `block sm:hidden w-full flex content-start`
          )}
        >
          {show && <MobileNavbar />}
        </div>
      </header>
    </>
  );
};

export default PageHeader;
