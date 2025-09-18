
import React from "react";
import "./Carousel.css"; 
import { Carousel } from "react-responsive-carousel";
import { img } from "../carousel/img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {/* 
Uses the JavaScript map() method to iterate over the img array. For each item in the array, it receives the image URL/path (imageItemLink) and the array index (index). */}
        {img.map((imageItemLink, index) => {
          return (
            <img
              key={index}
              src={imageItemLink}
              alt={`Carousel item ${index}`}
            />
          );
        })}
      </Carousel>
      <div className="hero_img"></div>
    </div>
  );
}

export default CarouselEffect;
