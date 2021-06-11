import React from "react";
import { ButtonProps } from "@components/atoms/button/Button.props";
import { buttonStyles } from "@components/atoms/button/Button.styles";

const Button: React.FC<ButtonProps & { onClick: (any) => void }> = ({
  children,
  size = "default",
  link = false,
  style = "default",
  className,
  ...props
}) => {
  const classNames = buttonStyles({ style, size });
  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
};

export default Button;
