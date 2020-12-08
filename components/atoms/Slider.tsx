import React from "react";
import Carousel from "nuka-carousel";

const Slider = ({ children, ...props }) => {
  return <Carousel {...props}>{children}</Carousel>;
};

export default Slider;
