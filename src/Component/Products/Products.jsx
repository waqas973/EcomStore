import React from "react";
import Product from "./Product";

const Products = ({ products, onAddToCart }) => {
  return (
    <main>
      <div className="container">
        <div className="row">
          {products.map(product => {
            return (
              <div
                className="col-lg-3 col-md-4 col-sm-6 col-12 justify-content-center mb-4"
                key={product.id}
              >
                <Product product={product} onAddToCart={onAddToCart} />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Products;
