import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import Orders from "../Orders/Orders";
import Products from "../Products/Products";
import {
  addCartFromLocalStorage,
  addToDB,
  deleteFromLocalStorage,
  removeFromLocalStorage,
} from "../Utilities/fakeDB";
import "./Shop.css";

const Shop = () => {
  const products = useLoaderData();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = addCartFromLocalStorage();
    const savedCart = [];
    for (const id in storedCart) {
      const addedProduct = products?.find((product) => product.id === id);
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [products]);

  

  const handleAddToCart = (selectedProduct) => {
    let shipping = 0;
    const exists = cart.find((product) => product.id === selectedProduct.id);
    let newCart = [];
    if (!exists) {
      selectedProduct.quantity = 1;
      selectedProduct.shipping = shipping + selectedProduct.shipping;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter((product) => product.id !== selectedProduct.id);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }
    setCart(newCart);
    addToDB(selectedProduct.id);
  };

  const removeCart = (selectedProduct) => {
    const exists = products.find(
      (product) => product.id === selectedProduct.id
    );
    let newCart = [];
    if (exists) {
      exists.quantity = 0;
      exists.shipping = 0;
      newCart = [...cart, exists];
    }
    setCart(newCart);
    removeFromLocalStorage(selectedProduct.id);
  };

  const clearCart = () => {
    setCart([]);
    deleteFromLocalStorage();
  };

  return (
    <div className="shop-container">
      <div className="products">
        {products?.map((product) => (
          <Products
            product={product}
            key={product.id}
            handleAddToCart={handleAddToCart}
            removeCart={removeCart}
          ></Products>
        ))}
      </div>
      <div>
        <Orders cart={cart} clearCart={clearCart}>
          <button className='review-order-btn'>
            <Link to='/orders'>Review Orders</Link>
          </button>
        </Orders>
      </div>
    </div>
  );
};

export default Shop;
