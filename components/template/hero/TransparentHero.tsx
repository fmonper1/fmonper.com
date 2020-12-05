import PageContainer from "@components/template/PageContainer";
import Title from "@components/atoms/Title";
import Divider from "@components/atoms/Divider";
import React from "react";

type Props = {
  title?: string;
  subtitle?: string;
  children?: any;
};
const TransparentHero = ({ title, subtitle, children }: Props) => {
  return (
    <div className="bg-primary-main">
      <div className="inverted-dots ">
        <PageContainer className=" py-8 md:py-12">
          {children ? (
            children
          ) : (
            <div className="text-center space-y-4">
              <Title size={1} color="text-white">
                {title}
              </Title>
              <Divider className="mx-auto" />
              <Title size={2} color="text-secondary-main">
                {subtitle}
              </Title>
            </div>
          )}
        </PageContainer>
      </div>
    </div>
  );
};

export default TransparentHero;
