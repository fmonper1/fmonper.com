import React from "react";
import clsx from "clsx";

type TitleProps = {
  size: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: any;
  color?: "primary" | "secondary" | string;
};

const Title: React.FC<TitleProps> = ({
  size,
  className,
  children,
  color = "primary",
  ...props
}) => {
  const baseCss = clsx(
    color === "primary" && "text-primary-main",
    color === "secondary" && "text-secondary-main",
    color && color !== "primary" && color !== "secondary" && color
  );

  switch (size) {
    case 1:
      return (
        <h1
          className={`text-3xl md:text-4xl font-bold ${className} ${baseCss}`}
          {...props}
        >
          {children}
        </h1>
      );
    case 2:
      return (
        <h2
          className={`text-2xl md:text-3xl font-bold ${className} ${baseCss}`}
          {...props}
        >
          {children}
        </h2>
      );
    case 3:
      return (
        <h3
          className={`text-xl md:text-2xl font-bold ${className} ${baseCss}`}
          {...props}
        >
          {children}
        </h3>
      );
    case 4:
      return (
        <h4 className={`text-md md:text-xl ${className} ${baseCss}`} {...props}>
          {children}
        </h4>
      );
    default:
      break;
  }
};

export default Title;
