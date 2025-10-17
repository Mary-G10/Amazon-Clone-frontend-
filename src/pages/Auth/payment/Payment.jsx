import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./payment.module.css";
import LayOut from "../../../components/LayOut/LayOut";
import { DataContext } from "../../../components/dataProvider/DataProvider";
import ProductCard from "../../../components/product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../../components/CurrencyFormat";
import { axiosInstance} from "../../../Api/Axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../../utility/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { Type } from "../../../utility/Action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  // Destructures user data, shopping basket, and dispatch function from global context
  const navigate = useNavigate();
  // Initializes navigation function for routing

  const totalItem = basket?.reduce((amount, item) => {
    // Calculates total number of items in basket using reduce method with optional chaining
    return item.amount + amount;
  }, 0);
  // Accumulates the quantity of each item ans sets initial accumulator value to 0
  const total = basket?.reduce((amount, item) => {
    return amount + item.price * item.amount;
  }, 0);
  // Starts calculation of total price using reduce method and Multiplies each item's price by its quantity and adds to running total
  const [cardError, setCardError] = useState(null);
  // Creates state for storing card validation error messages
  const [processing, setProcessing] = useState(false);
  //Creates state for tracking whether payment is currently being processed
  const stripe = useStripe();
  // Gets Stripe instance for payment processing
  const elements = useElements();
  // Gets Stripe elements instance for accessing form elements

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };
  // Handles changes in card input, Sets error message if card validation fails, otherwise clears error

  const handlePayment = async (e) => {
    e.preventDefault();
    // Defines async payment handler and prevents default form submission

    if (!stripe || !elements) {
      return;
    }
    //Checks if Stripe instances are available
    // Check if user is authenticated
    if (!user || !user.uid) {
      setCardError("Please sign in to complete your purchase");
      navigate("/auth"); // Redirect to authentication page
      return;
    }
    // Checks if user is authenticated,Sets error message for unauthenticated users
    try {
      setProcessing(true);
      setCardError(null);
      // Starts processing state to show loading indicator and clears previous errors
      // 1. Backend functions - contact to get client secret
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      // Makes API call to backend to create payment intent (Specifies HTTP POST method)
      // Sets endpoint URL with total amount in cents (Stripe requires cents)
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      // Extracts client secret needed for Stripe payment confirmation
      if (!clientSecret) {
        throw new Error("Failed to get client secret from server");
      }
      //Checks if client secret was received and throw Error if client secret is missing
      // 2. Client side (react side confirmation)
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );
      // Confirms payment with Stripe using the card element
      if (error) {
        setCardError(error.message);
        setProcessing(false);
        return;
      }
      // check if Stripe returned an error,set a message and stop processing state
      // 3. After confirmation - save order to Firestore database using v9+ syntax
      const userOrdersRef = collection(db, "users", user.uid, "orders");
      // Creates reference to user's orders collection in Firestore
      const orderDocRef = doc(userOrdersRef, paymentIntent.id);
      //Creates reference to specific order document using payment intent ID
      await setDoc(orderDocRef, {
        basket: basket,
        amount: paymentIntent.amount,
        totalAmount: total,
        created: paymentIntent.created,
        status: paymentIntent.status,
      });
      // Saves order details  or data to Firestore

      dispatch({
        type: Type.EMPTY_BASKET,
      });
      // Clear the shopping basket after successful payment
      setProcessing(false);
      navigate("/orders", { state: { msg: "you have placed new order" } });
      //  Stops processing state and navigates to orders page with success message
    } catch (error) {
      console.log("Payment error:", error);
      setCardError(
        error.message || "An error occurred during payment processing"
      );
      setProcessing(false);
    }
  };
  //Catches any errors  during the payment process and throw an err message

  if (!user) {
    return (
      <LayOut>
        <div className={classes.payment_header}>Please sign in to continue</div>
        <div style={{ textAlign: "center", padding: "20px" }}>
          <p>You need to be signed in to access the checkout page.</p>
          <button onClick={() => navigate("/auth")}>Sign In</button>
        </div>
      </LayOut>
    );
  }
  //  // Early return with sign-in prompt if user is not authenticated
  return (
    <LayOut>
      <div className={classes.payment_header}>checkout ({totalItem}) items</div>
      {/* Renders layout wrapper and checkout header with item count */}
      <section className={classes.payment}>
        {/* Delivery Address Section */}
        <div className={classes.flex}>
          <div>
            <h3>Delivery Address</h3>
          </div>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        {/* Displays delivery address section with user email and hardcoded address */}
        <hr />

        {/* Review Items Section */}
        <div className={classes.flex}>
          <div>
            <h3>Review items and delivery</h3>
          </div>
          <div>
            {basket?.map((item, index) => (
              <ProductCard key={item.id || index} product={item} flex={true} />
            ))}
          </div>
        </div>
        {/* Maps through basket items and renders each item as ProductCard  */}
        <hr />

        {/* Payment Methods Section */}
        <div className={classes.flex}>
          <h3>Payment Methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* Creates payment form section */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* Conditionally displays card errors in red */}
                <CardElement
                  onChange={handleChange}
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                    },
                  }}
                />
                {/* Renders Stripe's card input element with custom styling */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  {/* Displays total order amount with proper formatting */}
                  <button type="submit" disabled={!stripe || processing}>
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                  {/* Displays total order amount with proper formatting */}
                  {/*  */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
// This component handles the complete payment flow including authentication checks, Stripe integration, order storage, and user feedback.