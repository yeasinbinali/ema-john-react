import React, { useState } from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import OrderReview from "../OrderReview/OrderReview";
import Orders from "../Orders/Orders";
import './OrderProduct.css'
import { deleteFromLocalStorage, removeFromLocalStorage } from "../Utilities/fakeDB";

const OrderProduct = () => {
  const { orderedCart } = useLoaderData();
  const [cart, setCart] = useState(orderedCart);

  const handleRemoveCart = id => {
    const remaining = cart.filter(product => product.id !== id)
    setCart(remaining);
    removeFromLocalStorage(id);
  }
  const clearCart = () => {
    setCart([]);
    deleteFromLocalStorage();
  };
  return (
    <div className='shop-container'>
      <div className="product-container">
          {
              cart.map(product => <OrderReview
                handleRemoveCart = {handleRemoveCart}
                key = {product.id}
                product = {product}
              ></OrderReview>)
          }
          {
            cart.length === 0 && <h2 className='noItem'>No item show. Go to <Link to='/shop'>Shop container</Link></h2>
          }
      </div>
      <div className="order-container">
        <Orders clearCart = {clearCart} cart={cart}>
          <button className='shop-btn'>
            <Link to='/shop'>Shop</Link>
          </button>
        </Orders>
      </div>
    </div>
  );
};

export default OrderProduct;
