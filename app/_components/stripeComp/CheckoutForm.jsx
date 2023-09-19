import React from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import { useAlertService, useUserService, useTaskService } from '_services';
import {Spinner} from '_components';
import { toast } from "react-toastify";

export default function CheckoutForm() {

  // console.log('data in checkform =>', data);
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const alertService = useAlertService();
  const taskService = useTaskService();

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      alertService.clear();
      switch (paymentIntent.status) {
        case "succeeded":
          // setMessage("Payment succeeded!");
          alertService.success('Payment succeeded!');
          // taskService.addTask(data);
          toast.success('Payment is almost fixed')
          ;break;
        case "processing":
          // setMessage("Your payment is processing.");
          alertService.alert('Your payment is processing!');
          break;
        case "requires_payment_method":
          // setMessage("Your payment was not successful, please try again.");
          alertService.error('Your payment is processing!');
          break;
        default:
          // setMessage("Something went wrong.");
          alertService.error('Something went wrong!');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
        // return_url: "https://study-swiftly-project.vercel.app"
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      alertService.error(error.message);
      // setMessage(error.message);
    } else {
      // setMessage("An unexpected error occurred.");
      alertService.error('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
        className="text-white"
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      {!isLoading ? 
      <button disabled={isLoading || !stripe || !elements} className="text-[16px] bg-primary-500 rounded-md w-full my-4 py-2 text-center" id="submit">
        <span id="button-text">
          Pay Now
        </span>
      </button>
      : <Spinner /> 
      }
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}