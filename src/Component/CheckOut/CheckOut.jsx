import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { commerce } from "../../Lib/Commerce";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import "./CheckOut.css";

const CheckOut = ({ cart, order, handleCaptureCheckOut, errorMsg }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkOutToken, setCheckOutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  let navigator = useNavigate();

  const Form = () => {
    if (parseInt(activeStep) === 0) {
      return <AddressForm checkOutToken={checkOutToken} next={next} />;
    } else if (activeStep === 1) {
      return (
        <PaymentForm
          shippingData={shippingData}
          checkOutToken={checkOutToken}
          backStep={backStep}
          handleCaptureCheckOut={handleCaptureCheckOut}
          nextStep={nextStep}
          timeOut={timeOut}
        />
      );
    } else {
      return <Confirmation />;
    }
  };
  let Confirmation = () =>
    isLoading ? (
      <>
        <div>
          <h5>Thank you for your purchase,</h5>
          <hr />
        </div>
        <br />
        <button
          type="button "
          className="btn btn-primary"
          onClick={() => navigator("/")}
        >
          Back to home
        </button>
      </>
    ) : (
      <div className="spinner-border my-5" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  if (errorMsg) {
    Confirmation = () => (
      <>
        <h5>Error: {errorMsg}</h5>
        <br />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigator("/")}
        >
          Back to home
        </button>
      </>
    );
  }
  const timeOut = () => {
    setIsLoading(false);
    setTimeout(() => {
      setIsLoading(true);
    }, 3000);
  };
  const nextStep = () => {
    setActiveStep(previousStep => previousStep + 1);
  };
  const backStep = () => {
    setActiveStep(previousStep => previousStep - 1);
  };
  const next = data => {
    setShippingData(data);
    nextStep();
  };
  // useEffect
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckOutToken(token);
      } catch (error) {
        navigator("/");
      }
    };
    generateToken();
  }, [cart]);

  return (
    <main className="check__out">
      <div className="container">
        <div className="card my-5">
          <div className="card-body">
            <h5 className="card-title">CheckOut</h5>
            <div className="title__container">
              <div
                className={`circle left__side ${
                  (parseInt(activeStep) === 0 || activeStep > 1) && "active"
                }`}
              >
                <span>1</span>
                <h6>shipping address</h6>
              </div>
              <div
                className={`circle right__side ${
                  (parseInt(activeStep) === 1 || activeStep > 1) && "active"
                }`}
              >
                <span>2</span>
                <h6>payment details</h6>
              </div>
            </div>

            {/* form  */}
            {checkOutToken && <Form />}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckOut;
