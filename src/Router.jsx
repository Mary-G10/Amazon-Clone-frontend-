import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Auth/Landing/Landing/Landing";
import Auth from "./pages/Auth/Auth";
import Payment from "./pages/Auth/payment/Payment";
import Orders from "./pages/Auth/orders/Orders";
import Cart from "./pages/Auth/Cart/Cart";
import Results from "./pages/Auth/Results/Results";
import ProductDetail from "./pages/Auth/productDetail/ProductDetail";

function Routing() {
  return (
    <Router basename="/Amazon-Clone-frontend-/">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
