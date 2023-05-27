import React, { useEffect, useState } from "react";
import InventoryProduct from "../InventoryProduct/InventoryProduct";
import {
  addCartFromLocalStorage,
  addToDB,
  removeFromLocalStorage,
} from "../Utilities/fakeDB";
import './Inventory.css';

const Inventory = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [size] = useState(10);

  const pages = Math.ceil(count / size);

  useEffect(() => {
    const url = `https://ema-john-server-eosin.vercel.app/products?page=${page}&size=${size}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setProducts(data.products);
      });
  }, [page, size, setProducts]);

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

  return (
    <div className="container">
      <h3 className="text-center mt-2 font-bold">Inventory</h3>
      <div className="products">
        {products?.map((product) => (
          <InventoryProduct
            product={product}
            key={product._id}
            handleAddToCart={handleAddToCart}
            removeCart={removeCart}
          ></InventoryProduct>
        ))}
      </div>

      <div className="pagination">
        <div>
          {[...Array(pages).keys()].map((number) => (
            <button
              key={number}
              onClick={() => setPage(number)}
              className={page === number && "selected"}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Inventory;
