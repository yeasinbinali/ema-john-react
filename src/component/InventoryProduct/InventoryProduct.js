import React from "react";
import { Link } from "react-router-dom";

const InventoryProduct = (props) => {
  const { name, seller, price, ratings, stock, img, category, _id } = props.product;

  return (
    <div className="product-container">
      <img src={img} alt="img-failed"></img>
      <div className="product-info">
        <div>
          <h2 className="text-xs m-0 md:text-2xl font-bold">{name.substring(0, 50)}</h2>
          <p className="m-0 text-xs md:text-xl">
            Company: <b>{seller}</b> | Category: <b>{category}</b>
          </p>
          <p className="text-md md:text-3xl m-0 md:my-1 lg:my-2 font-extrabold">
            <b>${price}</b>
          </p>
          <h5 className="mt-0 text-xs md:text-xl">
            In Stock: {stock} | Ratings: {ratings}
          </h5>
        </div>
        <div className="button mt-2">
          <Link to={`/product/${_id}`}>
            <button className="cart-btn-left">
              View
            </button>
          </Link>
          <Link to={`/inventory/${_id}`}>
            <button className="cart-btn-right">
              Update
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InventoryProduct;
