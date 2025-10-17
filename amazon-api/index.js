const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success!",
  });
});
//  checks or testing if the API is running and return a status with a success message
app.post("/payment/create", async (req, res) => {
  //  asynchronous calls to Stripe
  const total = req.query.total;
// Extracts the total parameter from the query string
// Converts it to an integer using parseInt()
  if (total > 0) {
    // Validates that the total amount is greater than 0
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      // await waits for the Stripe API call to complete
      // Creates a new Stripe PaymentIntent with the specified amount
    });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
    // Sends back the client secret from the PaymentIntent
    // Client secret is used by frontend to confirm the payment
  } else {
    res.status(403).json({
      message: "total must be greater than 0",
    });
    // If total is 0 or negative, returns HTTP 403 (Forbidden)
  }
});

app.listen(5000, (err) => {
  if (err) throw err;
  console.log("Amazon server running on port:5000,http://localhost:5000");
});
