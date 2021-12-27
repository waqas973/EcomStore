import React from "react";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review/Review";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const PaymentForm = ({
  shippingData,
  checkOutToken,
  backStep,
  handleCaptureCheckOut,
  nextStep,
  timeOut,
}) => {
  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      // const orderData = {
      //   line_items: checkOutToken.live.line_items,
      //   customer: {
      //     firstname: shippingData.firstName,
      //     lastname: shippingData.lastName,
      //     email: shippingData.email,
      //   },
      //   shipping: {
      //     name: "International",
      //     street: shippingData.address,
      //     town_city: shippingData.city,
      //     county_state: shippingData.subdivision,
      //     postal_zip_code: shippingData.zip,
      //     country: shippingData.shippingCountry,
      //   },
      //   fulfillment: { shipping_method: shippingData.shippingOption },
      //   payment: {
      //     gateway: "stripe",
      //     stripe: {
      //       payment_method_id: paymentMethod.id,
      //     },
      //   },
      // };

      handleCaptureCheckOut(checkOutToken.id);
      nextStep();
      timeOut();
    }
  };
  return (
    <>
      <Review checkOutToken={checkOutToken} />
      <hr />
      <h4 className="my-4" style={{ textAlign: "start" }}>
        Payment method
      </h4>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={e => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div className="d-flex justify-content-between ">
                <button
                  type="button "
                  className="btn btn-dark"
                  onClick={backStep}
                >
                  Back
                </button>
                <button
                  type="submit "
                  disabled={!stripe}
                  className="btn btn-primary"
                >
                  Pay {checkOutToken.live.subtotal.formatted_with_symbol}
                </button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
