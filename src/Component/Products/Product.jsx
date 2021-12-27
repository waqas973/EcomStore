import React from "react";
import { BsCartCheck } from "react-icons/bs";
import "./Product.css";
const Product = ({ product, onAddToCart }) => {
  return (
    <div className="card">
      <img
        src={product.image?.url}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body">
        <div className="title__container">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.price.formatted_with_symbol}</p>
        </div>

        <p
          className="card-text"
          dangerouslySetInnerHTML={{
            __html: product.description.slice(0, 60) + "...",
          }}
        ></p>

        <button
          type="button"
          className="  add_product"
          onClick={() => onAddToCart(product.id, 1)}
        >
          <BsCartCheck className="add_productIcon" />
        </button>
      </div>
    </div>
  );
};

export default Product;
