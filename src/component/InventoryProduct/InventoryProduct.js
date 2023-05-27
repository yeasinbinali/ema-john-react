import { faEye, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const InventoryProduct = (props) => {
  const { name, seller, price, ratings, stock, img, category, _id } =
    props.product;
  return (
    <div className="product-container">
      <img src={img} alt="img-failed"></img>
      <div className="product-info">
        <div>
          <h2 className="text-2xl font-bold">{name.substring(0, 50)}</h2>
          <p className="m-0">
            Company: <b>{seller}</b> | Category: <b>{category}</b>
          </p>
          <p className="text-3xl my-2 font-extrabold">
            <b>${price}</b>
          </p>
          <h5 className="text-lg">
            In Stock: {stock} | Ratings: {ratings}
          </h5>
        </div>
        <div className="button">
          <Link to={`/product/${_id}`}>
            <button className="cart-btn-left">
              <FontAwesomeIcon className="text-white" icon={faEye} />
              View
            </button>
          </Link>
          <button
            className="cart-btn-right"
          >
            <FontAwesomeIcon className="text-white" icon={faUpload} />
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryProduct;
