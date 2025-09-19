import React from "react";
import { useParams } from "react-router-dom";
import classes from "./ProductDetail.module.css";
import LayOut from "../../../components/LayOut/LayOut";
import axios from "axios";
import { productUrl } from "../../../Api/EndPoints";
import { useState, useEffect } from "react";
import ProductCard from "../../../components/product/ProductCard";
import Loader from "../../../components/Loader/Loader";

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // Extracts the productId parameter from the URL using React Router's useParams hook.
  // Creates state to store the product data, initialized as an empty object.
  // Creates state to track loading status, initialized as false.
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        // The false value typically triggers the UI to stop showing loading spinners
      });
  }, [productId]);
  // Starts a useEffect hook that runs when the component mounts or when dependencies change.
  // Sets loading state to true before making the API call.
  // Makes a GET request to fetch product details. Constructs URL by combining base URL with the specific product ID.
  // Stores the product data from res.data in state Sets loading to false
  // Dependency array - effect re-runs when productId changes
  // Gets a product ID from the URL
  // Fetches product data from an API when the component loads
  // Shows a loading spinner while fetching
  // Displays the product using a reusable ProductCard component
  // Handles errors by logging them and stopping the loading state

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
          // passes as a props
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </LayOut>
  );
}

export default ProductDetail;
