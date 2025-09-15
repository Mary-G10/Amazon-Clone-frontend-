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

  useEffect(() => {
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);

  return (
    <LayOut>
      <ProductCard product={product} />
    </LayOut>
  );
}

export default ProductDetail;
