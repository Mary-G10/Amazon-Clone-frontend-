import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./ProductCard.module.css";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <section className={classes.products_container}>
        {products.map((singleProduct) => (
          <ProductCard product={singleProduct} key={singleProduct.id} />
        ))}
      </section>
    </div>
  );
};

export default Product;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ProductCard from "./ProductCard";
// import classes from './ProductCard.module.css'

// const Product = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://fakestoreapi.com/products")
//       .then((res) => {
//         setProducts(res.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <div>
//       <section className={ClassNames.products_container}>
//         {products.map((singleProduct) => (
//           <ProductCard product={singleProduct} key={singleProduct.id} />
//         ))}
//       </section>
//     </div>
//   );
// };

// export default Product;
