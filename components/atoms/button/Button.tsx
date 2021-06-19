import React from "react";
import { ButtonProps } from "@components/atoms/button/Button.props";
import styles from "./Button.module.css";
import classNames from "classnames";

const Button: React.FC<ButtonProps & { onClick?: (any) => void }> = ({
  children,
  size = "default",
  link = false,
  style = "default",
  className,
  ...props
}) => {
  return (
    <button
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
    </button>
  );
};

export default Button;
