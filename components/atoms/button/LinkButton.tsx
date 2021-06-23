import React from "react";
import Link from "next/link";
import { ButtonProps } from "@components/atoms/button/Button.props";
import styles from "@components/atoms/button/Button.module.css";
import classNames from "classnames";

type LinkButtonProps = ButtonProps & {
  href: string;
  // onClick: any;
};

const Button: React.FC<LinkButtonProps> = ({
  children,
  size = "default",
  style = "default",
  className,
  href,
  ...props
}) => {
  return (
    <Link href={href}>
      <a
        className={classNames(styles.button, className && className, {
          [styles.button__xs]: size === "xs",
          [styles.button__lg]: size === "lg",
          [styles.button__xl]: size === "xl",
          [styles.button__default]: style === "default",
          [styles.button__link]: style === "link",
          [styles.button__primary]: style === "primary",
        })}
        {...props}
      >
        {children}
      </a>
    </Link>
  );
};

export default Button;
