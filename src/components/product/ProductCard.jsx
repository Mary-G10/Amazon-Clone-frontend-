import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat";
import styles from "./ProductCard.module.css"; // Import CSS modules

const ProductCard = ({ product }) => {
  const { image, title, id, rating, price } = product;

  return (
    <div className={styles.card_container}>
      {" "}
      {/* Use styles.className */}
      <a href="">
        <img src={image} alt={title} />
      </a>
      <div>
        <h3>{title}</h3>

        <div className={styles.rating}>
          <Rating value={rating.rate} precision={0.1} readOnly />
          <small>{rating.count}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        <button className={styles.button}>add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;

// import React from "react";
// import Rating from "@mui/material/Rating";
// import CurrencyFormat from "../CurrencyFormat";

// const ProductCard = ({ product }) => {
//   const { image, title, id, rating, price } = product;

//   return (
//     <div className={`${ClassNames.card_container}`}>
//       <a href="">
//         <img src={image} alt={title} />
//       </a>
//       <div>
//         <h3>{title}</h3>

//         <div className={ClassNames.rating}>
//           {/* rating */}
//           <Rating value={rating.rate} precision={0.1} readOnly />
//           {/* count */}
//           <small>{rating.count}</small>
//         </div>
//         <div>
//           {/* price */}
//           <CurrencyFormat amount={price} />
//         </div>
//         <button className={ClassNames.button}>add to cart</button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
