import React from "react";
import "./Cartitems.css";

const CartItems = ({ item, updateCartQuantity, RemoveitemFromCart }) => {
  return (
    <div className="card">
      <img src={item.image?.url} className="card-img-top" alt={item.name} />
      <div className="card-body">
        <div className="title__container">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.line_total.formatted_with_symbol}</p>
        </div>

        <div className="button__container">
          <button
            type="button"
            className="btn increase_item"
            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            type="button"
            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
            className="btn decrease_item"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => RemoveitemFromCart(item.id)}
            className="btn remove_item"
          >
            remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
