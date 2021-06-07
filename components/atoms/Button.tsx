import React from "react";
import Link from "next/link";
import clsx from "clsx";

interface Props {
  children;
  className?;
  link?;
  size?: "xs" | "default" | "lg" | "xl";
  style?: "default" | "link" | "primary";
  [props: string]: any;
}

const Button = ({
  children,
  size = "default",
  link = false,
  style = "default",
  className,
  ...props
}: Props) => {
  const defaultClasses = clsx(
    "inline-block rounded-md transition duration-100 font-bold",
    size === "xs" && "p-1 text-base",
    size === "default" && "p-2 text-base",
    size === "lg" && "p-4 text-xl",
    size === "xl" && "p-6 text-xl",
    style === "default" &&
      "bg-secondary-main hover:bg-secondary-light text-black",
    style === "link" &&
      "bg-transparent hover:bg-white hover:bg-primary-main text-secondary-main",
    style === "primary" &&
      "bg-secondary-main hover:bg-secondary-light text-black",
    className && className
  );

  if (link) {
    return (
      <Link href={props.href}>
        <a className={defaultClasses} {...props}>
          {children}
        </a>
      </Link>
    );
  }
  return (
    <button className={defaultClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
