"use client"

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import { useFetch } from '_helpers/client';
import {Spinner} from '_components';

import { useAlertService, useUserService, useTaskService } from '_services';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function StripeComp({data}) {
  const [clientSecret, setClientSecret] = React.useState("");
  const [fetchValue, setFetchValue] = React.useState(null);

  const cost = data.cost ? ((data.cost.split('$')[1].split(')')[0])*1 + (data.homework.split('$')[1].split(')')[0])*1) : (data.homework.split('$')[1].split(')')[0])*1 ;
  console.log('cost => ', cost)

  const taskService = useTaskService();

  const fetch = useFetch();

  const func = async () => {
    let temp = await fetch.post("/api/create-payment-intent", { cost: cost, priority: data.priority })
    console.log('temp => ', temp.clientSecret)
    setClientSecret(temp.clientSecret);
  }

  React.useEffect(() => {
    func();
    // taskService.addTask(data);
  }, []);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#8dc2f7',
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  console.log('options =>', options);

  return (
    <div>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm/>
        </Elements>
      ) : <Spinner/>}
    </div>
  );
}