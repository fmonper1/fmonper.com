import clsx from "clsx";
import { ButtonProps } from "@components/atoms/button/Button.props";

export const buttonStyles = ({ size, style }: ButtonProps) =>
  clsx(
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
      "bg-secondary-main hover:bg-secondary-light text-black"
  );
