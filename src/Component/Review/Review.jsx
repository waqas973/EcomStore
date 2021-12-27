import React from "react";
import "./Review.css";

const Review = ({ checkOutToken }) => {
  return (
    <>
      <h4>Order Summary</h4>
      <div className="cart__items p-2">
        {checkOutToken.live.line_items.map(product => (
          <div className="item__wrapper py-2" key={product.id}>
            <div className="item__title">
              <h6>{product.name}</h6>
              <span>{product.line_total.formatted_with_symbol}</span>
            </div>
            <h6
              className="text-start"
              style={{ color: "#6c757d", fontSize: "0.8rem" }}
            >
              Quantity: {product.quantity}
            </h6>
          </div>
        ))}

        <h5>Total: {checkOutToken.live.subtotal.formatted_with_symbol}</h5>
      </div>
    </>
  );
};

export default Review;
