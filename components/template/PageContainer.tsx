import React from "react";
interface Props {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow";
}
const PageContainer = ({ children, className, size = "default" }: Props) => {
  return (
    <div
      className={`mx-auto p-8  ${className}`}
      style={{ maxWidth: size === "narrow" ? "800px" : "1100PX" }}
    >
      {children}
    </div>
  );
};

export default PageContainer;
