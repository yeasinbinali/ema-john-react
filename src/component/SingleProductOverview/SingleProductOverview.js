import React from "react";
import './SingleProductOverview.css';
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";

const SingleProductOverview = () => {
  const product = useLoaderData();
  const { name, seller, price, ratings, stock, img, category, shipping, ratingsCount } = product;
  return (
    <div className="product-container mt-5 container">
      <img src={img} alt="img-failed"></img>
      <div className="product-info">
        <div>
          <h2 className="text-xs m-0 md:text-2xl font-bold">{name}</h2>
          <p className="m-0 text-xs md:text-xl">
            By <b>{seller}</b> | Category: <b>{category}</b>
          </p>
          <p className="text-md md:text-3xl m-0 md:my-1 lg:my-2 font-extrabold">
            <b>${price}</b>
          </p>
          <h5 className="m-0 text-xs md:text-xl">
            In Stock: {stock} | Ratings: {ratings}
          </h5>
          <h5 className="mt-0 text-xs md:text-xl">
              Shipping: {shipping} | Ratings Count: {ratingsCount}
          </h5>
        </div>
        <Link to='/'>
            <button style={{backgroundColor: 'rgb(255, 145, 0)', color: 'white', fontWeight: 'bold', borderRadius: '20px'}}>Go back</button>
        </Link>
      </div>
    </div>
  );
};

export default SingleProductOverview;
