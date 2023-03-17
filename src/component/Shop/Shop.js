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
  // const {products, count} = useLoaderData();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const pages = Math.ceil(count / size);

  useEffect(() => {
    const url = `https://ema-john-server-eosin.vercel.app/products?page=${page}&size=${size}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setProducts(data.products);
      });
  }, [page, size]);

  useEffect(() => {
    const storedCart = addCartFromLocalStorage();
    const savedCart = [];
    const ids = Object.keys(storedCart);
    fetch("https://ema-john-server-eosin.vercel.app/productsByIds", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("by ids", data);
        for (const id in storedCart) {
          const addedProduct = data?.find((product) => product._id === id);
          if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
          }
        }
        setCart(savedCart);
      });
  }, [products]);

  const handleAddToCart = (selectedProduct) => {
    let shipping = 0;
    const exists = cart.find((product) => product._id === selectedProduct._id);
    let newCart = [];
    if (!exists) {
      selectedProduct.quantity = 1;
      selectedProduct.shipping = shipping + selectedProduct.shipping;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter(
        (product) => product._id !== selectedProduct._id
      );
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, exists];
    }
    setCart(newCart);
    addToDB(selectedProduct._id);
  };

  const removeCart = (selectedProduct) => {
    const exists = products.find(
      (product) => product._id === selectedProduct._id
    );
    let newCart = [];
    if (exists) {
      exists.quantity = 0;
      exists.shipping = 0;
      newCart = [...cart, exists];
    }
    setCart(newCart);
    removeFromLocalStorage(selectedProduct._id);
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
            key={product._id}
            handleAddToCart={handleAddToCart}
            removeCart={removeCart}
          ></Products>
        ))}
      </div>
      <div>
        <Orders cart={cart} clearCart={clearCart}>
          <button className="review-order-btn">
            <Link to="/orders">Review Orders</Link>
          </button>
        </Orders>
      </div>

      <div className="pagination">
        <p>Your current page: {page}</p>
        <div>
          {[...Array(pages).keys()].map((number) => (
            <button
              key={number}
              onClick={() => setPage(number)}
              className={page === number && "selected"}
            >
              {number}
            </button>
          ))}
        </div>
        <select onChange={(event) => setSize(event.target.value)}>
          <option value="5">5</option>
          <option value="10" selected>
            10
          </option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default Shop;
