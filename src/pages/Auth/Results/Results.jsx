import React, { useState,useEffect } from "react";
import ProductCard from '../../../components/product/ProductCard'; 
import classes from "./Results.module.css";
import LayOut from "../../../components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../../Api/EndPoints";

function Results() {
  const [results, setResults] = useState([]);
  const { categoryName } = useParams();
  // Creates state variable results initialized as an empty array, with setResults function to update it. This will store the fetched products.
  // Extracts the categoryName parameter from the current URL using React Router's useParams hook.
  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>category/{categoryName}</p>
        <hr />
        <div className={classes.products_container}>
          {results?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              renderDesc={false}
              renderAdd={true}
            />
          ))}
          {/* Uses optional chaining and map to iterate over the results array, creating a ProductCard for each product. */}
        </div>
      </section>
    </LayOut>
  );
}

export default Results;
  