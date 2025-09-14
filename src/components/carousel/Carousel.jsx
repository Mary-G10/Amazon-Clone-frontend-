// import React from 'react'
// import {Carousel} from 'react-responsive-carousel'
// import {img} from '../carousel/img/data'
// import "react-responsive-carousel/lib/styles/carousel.min.css"
// function CarouselEffect  ()  {
//   return (
//     <div>
//       <carousel
//         autoPlay={true}
//         infiniteLoop={true}
//         showIndicators={false}
//         showThumbs={false}>
//             {
//                 img.map((imageItemLink)=>{
//                     return <img src={imageItemLink}/>
//                 })
//             }
//       </carousel>
//       <div className={classes.hero_img}></div>
//     </div>
//   )
// }

// export default CarouselEffect
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
