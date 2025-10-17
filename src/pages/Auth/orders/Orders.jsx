import React, { useContext, useState, useEffect } from "react";
import classes from "./Orders.module.css";
import LayOut from "../../../components/LayOut/LayOut";
import { db } from "../../../utility/firebase";
import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
  // onSnapshot: listens for real-time update
} from "firebase/firestore";
import { DataContext } from "../../../components/dataProvider/DataProvider";
import ProductCard from "../../../components/product/ProductCard";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  // Destructures user data from the DataContext using useContext hook. The dispatch function is available but not used in this component
  const [orders, setOrders] = useState([]);
  // Creates local state to store the user's orders, initialized as empty array
  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "orders");
      // Creates a reference to the user's orders collection in Firestore. Path structure: /users/{userId}/orders
      const q = query(ordersRef, orderBy("created", "desc"));
      // Creates a query that sorts orders by "created" field in descending order (newest first)

      const unsubscribe = onSnapshot(q, (snapshot) => {
        // unsubscribe function: needs to prevent memory leaks:: Without unsubscribing, the listener keeps running even after the component unmounts, causing memory leaks.
        console.log(snapshot);
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
      // Sets up real-time listener using onSnapshot
// Logs the snapshot for debugging
// Maps each document to an object with id and data properties
// Updates the orders state with the new data
    } else {
      setOrders([]);
    }
  }, [user]);
  // If no user exists, clears the orders array
// useEffect dependency array includes user, so it re-runs when user changes

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your orders</h2>
          {orders?.length === 0 && (
            <div style={{ padding: "20px" }}>You don't have orders yet.</div>
          )}
          {/* Conditional rendering: shows message when orders array is empty */}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  {/* Maps through orders array to render each order */}
                  <hr />
                  <p>Order ID:{eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                    return (
                      <ProductCard flex={true} product={order} key={order.id} />
                      // Maps through each order's basket items
                      // Renders ProductCard component for each item by Uses product ID as key
                      
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
