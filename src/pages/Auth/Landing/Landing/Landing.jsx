import React from "react";
import LayOut from "../../../../components/LayOut/LayOut";
import Carousel from "../../../../components/carousel/Carousel";
import Category from "../../../../components/Category/Category";
import Product from "../../../../components/product/Product";

function Landing() {
  return (
    <LayOut>
      <Carousel />
      <Category />
      <Product />
    </LayOut>
  );
}

export default Landing;
//  This is a landing page component that combines several UI components (carousel, categories, and products) within a layout wrapper to create what appears to be an e-commerce or product showcase homepage.
