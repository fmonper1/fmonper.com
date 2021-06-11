import React from "react";
import Link from "next/link";
import clsx from "clsx";
import { ButtonProps } from "@components/atoms/button/Button.props";
import { buttonStyles } from "@components/atoms/button/Button.styles";

type LinkButtonProps = ButtonProps & {
  href: string;
};

const Button: React.FC<LinkButtonProps> = ({
  children,
  size = "default",
  style = "default",
  className,
  href,
  ...props
}) => {
  const classNames = buttonStyles({ style, size });

  return (
    <Link href={href}>
      <a
        className={clsx(classNames, className && className, "flex")}
        {...props}
      >
        {children}
      </a>
    </Link>
  );
};

export default Button;
