import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../dataProvider/DataProvider";
import { Type } from "../../utility/Action.type";

const ProductCard = ({ product, flex, renderDesc, renderAdd }) => {
  const { image, title, id, rating, price, description } = product;
  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };

  return (
    <div
      className={`${styles.card_container} ${
        flex ? styles.product_flexed : ""
      }`}
    >
      <div className={styles.image_wrapper}>
        <Link to={`/products/${product.id}`}>
          <img src={image} alt={title} className={styles.img_container} />
        </Link>
      </div>

      <div className={styles.content_wrapper}>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}
        <div className={styles.rating}>
          <Rating value={rating?.rate} precision={0.1} readOnly />
          <small>{rating?.count}</small>
        </div>
        <div className={styles.price}>
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={styles.button} onClick={addToCart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

// import React from "react";
// import Rating from "@mui/material/Rating";
// import CurrencyFormat from "../CurrencyFormat";
// import styles from "./ProductCard.module.css";
// import { Link } from "react-router-dom";

// const ProductCard = ({ product, flex }) => {
//   const { image, title, id, rating, price } = product;

//   return (
//     <div
//       className={`${styles.card_container} ${
//         flex ? styles.product_flexed : ""
//       }`}
//     >
//       <Link to={`/products/${product.id}`}>
//         <img src={image} alt="" className={styles.img_container} />
//       </Link>
//       <div>
//         <h3>{title}</h3>

//         <div className={styles.rating}>
//           <Rating value={rating?.rate} precision={0.1} readOnly />
//           <small>{rating?.count}</small>
//         </div>
//         <div>
//           <CurrencyFormat amount={price} />
//         </div>
//         <button className={styles.button}>add to cart</button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

// import React from "react";
// import Rating from "@mui/material/Rating";
// import CurrencyFormat from "../CurrencyFormat";
// import styles from "./ProductCard.module.css";
// import { Link } from "react-router-dom";

// const ProductCard = ({ product,flex }) => {
//   const { image, title, id, rating, price } = product;

//   return (
//     <div className={`styles.card_container} ${flex?ClassNames.product_flexed:''}`}>
//       <Link to={`/products/${product.id}`}>
//         <img src={image} alt="" className={styles.img_container} />
//       </Link>
//       <div>
//         <h3>{title}</h3>

//         <div className={styles.rating}>
//           <Rating value={rating?.rate} precision={0.1} readOnly />
//           <small>{rating?.count}</small>
//         </div>
//         <div>
//           <CurrencyFormat amount={price} />
//         </div>
//         <button className={styles.button}>add to cart</button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
