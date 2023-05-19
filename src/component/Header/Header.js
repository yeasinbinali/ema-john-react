import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { AuthContext } from "../../UserContext/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import {
  addCartFromLocalStorage,
  addToDB,
  deleteFromLocalStorage,
  removeFromLocalStorage,
} from "../Utilities/fakeDB";
import { useForm } from "react-hook-form";

const Header = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const { user, logOutUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const clearCart = () => {
    setCart([]);
    deleteFromLocalStorage();
  };

  let total = 0;
  let quantity = 0;
  let shipping = 0;

  for (const selectedCart of cart) {
    quantity = quantity + selectedCart.quantity;
    total = total + selectedCart.price * selectedCart.quantity;
    shipping = shipping + selectedCart.shipping;
  }

  const tax = (total * 0.1).toFixed(2);
  const grandTotal = total + shipping + parseFloat(tax);

  return (
    <section>
      <img
        className="logo"
        src="https://i.ibb.co/yND0V8v/logo-95f238a5.png"
        alt="img-failed"
      />
      <div className="navbar-container">
        <Link to="/">Shop</Link>
        {user?.uid ? (
          <button className="btn-logout" onClick={logOutUser}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
          </>
        )}

        <>
          <Button
            style={{
              backgroundColor: "rgb(255, 145, 0)",
              border: "rgb(255, 145, 0)",
            }}
            onClick={handleShow}
          >
            <FontAwesomeIcon
              className="text-white text-3xl ml-4"
              icon={faShoppingCart}
            />
            <sup className="text-2xl">
              <b>
                <sup>{quantity}</sup>
              </b>
            </sup>
          </Button>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Review Orders</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <h4 className="review-title">Order Review</h4>
              <p>Selected Items: {quantity}</p>
              <p>Total Price: {total}</p>
              <p>Shipping Cost: {shipping}</p>
              <p>Tax(10%): {tax}</p>
              <p>
                <b>Grand Total: {grandTotal.toFixed(2)}</b>
              </p>
              <button onClick={clearCart} className='cart-btn'>Clear Cart</button>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      </div>
    </section>
  );
};

export default Header;
