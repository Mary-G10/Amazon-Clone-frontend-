
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Auth/Landing/Landing/Landing";
import Signup from "./pages/Auth/Signup";
import Payment from "./pages/Auth/payment/Payment";
import Orders from "./pages/Auth/orders/Orders";
import Cart from "./pages/Auth/Cart/Cart";
// import Results from "./pages/Auth/Results/Results";
// import Results from "/src/pages/Auth/Results/Results.jsx";
import Results from "./pages/Auth/Results/Results";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Signup />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Landing from "./pages/Auth/Landing/Landing";
// import Signup from "./pages/Auth/Signup";
// import Payment from "./pages/Auth/payment/Payment";
// import Orders from "./pages/Auth/orders/Orders";
// import Cart from "./pages/Auth/Cart/Cart";
// Landing
// function Routing() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Landing />} />
//         <Route path="/auth" element={<SignUp />} />

//         <Route path="/payments" element={<Payment />} />
//         <Route path="/orders" element={<Orders />} />
//         <Route path="/cart" element={<Cart />} />
//       </Routes>
//     </Router>
//   );
// }

// export default Routing;
