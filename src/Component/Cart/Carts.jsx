import React from "react";
import CartItems from "./CartItems";
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";

const Carts = ({
  cart,
  updateCartQuantity,
  RemoveitemFromCart,
  EmptyCarthandler,
}) => {
  const history = useNavigate();
  // empty cart component
  const EmptyCart = () => (
    <h4 className="onItem_inCart">
      You have no items in your shopping cart
      <Link to="/">start adding some </Link>
    </h4>
  );

  // fill cart componet
  const FilledCart = () => (
    <>
      <div className="row mt-5">
        {cart.line_items.map(item => (
          <div className="col-12 col-sm-6 col-md-4 mb-4" key={item.id}>
            <CartItems
              item={item}
              updateCartQuantity={updateCartQuantity}
              RemoveitemFromCart={RemoveitemFromCart}
            />
          </div>
        ))}
      </div>
      <div className="sub_total">
        SubTotal :{cart.subtotal.formatted_with_symbol}
      </div>
      <div className="button_container">
        <button
          type="button"
          className="btn empty_cart mb-5"
          onClick={EmptyCarthandler}
        >
          Empty Cart
        </button>
        <button
          type="button"
          className="btn checkout mb-5"
          onClick={() => history("/check-out")}
        >
          CheckOut
        </button>
      </div>
    </>
  );

  // check if loading
  if (!cart?.line_items) {
    return "Loading...";
  }
  return (
    <div className="container">
      <h3>Your Shopping Cart</h3>

      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </div>
  );
};

export default Carts;
