import React from "react";
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
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="m-0">
            By <b>{seller}</b> | Category: <b>{category}</b>
          </p>
          <p className="text-3xl my-2 font-extrabold">
            <b>${price}</b>
          </p>
          <h5 className="text-lg">
            In Stock: {stock} | Ratings: {ratings}
          </h5>
          <h5 className='text-lg'>
              Shipping: {shipping} | Ratings Count: {ratingsCount}
          </h5>
        </div>
        <Link to='/'>
            <button style={{backgroundColor: 'rgb(255, 145, 0)', color: 'white', padding: '5px 25px', fontWeight: 'bold', borderRadius: '20px'}}>Go back</button>
        </Link>
      </div>
    </div>
  );
};

export default SingleProductOverview;
