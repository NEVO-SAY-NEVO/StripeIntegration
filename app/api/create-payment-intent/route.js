
// This is your test secret API key.
import { NextResponse } from 'next/server';
import { apiHandler } from '_helpers/server/api';
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (cost, priority) => {
  console.log('cost =>', cost);
  if(priority) return cost*1 + 20;
  else return cost;
};

async function handler(req) {
  const body = await req.json();
  // const { items } = req.body;
  console.log('req.body =>', body)
  console.log('calculateOrderAmount(body.cost, body.priority) =>', calculateOrderAmount(body.cost, body.priority))

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(body.cost, body.priority),
    currency: "eur",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return {clientSecret: paymentIntent.client_secret}
};

module.exports = apiHandler({
  POST: handler
});