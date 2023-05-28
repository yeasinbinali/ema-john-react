import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import "./Header.css";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { AuthContext } from "../../UserContext/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import {
  addCartFromLocalStorage,
  deleteFromLocalStorage,
} from "../Utilities/fakeDB";
import { Badge } from "react-bootstrap";

const Header = () => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const storedCart = addCartFromLocalStorage();
  const ids = Object.keys(storedCart);

  const { data, refetch } = useQuery(["cart"], () =>
    fetch("https://ema-john-server-eosin.vercel.app/productsByIds", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    }).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const savedCart = [];
      for (const id in storedCart) {
        const addedProduct = data.find((product) => product._id === id);
        if (addedProduct) {
          const quantity = storedCart[id];
          addedProduct.quantity = quantity;
          savedCart.push(addedProduct);
        }
      }
      setCart(savedCart);
    }
  }, [data]);
  refetch();
  const clearCart = () => {
    setCart([]);
    deleteFromLocalStorage();
  };

  let total = 0;
  let quantity = 0;
  let shipping = 0;

  for (const selectedCart of cart) {
    quantity = quantity + selectedCart.quantity;
    total = total + parseFloat(selectedCart.price) * selectedCart.quantity;
    shipping = shipping + parseFloat(selectedCart.shipping);
  }

  const totalPrice = total.toFixed(2);
  const totalShipping = shipping.toFixed(2);
  const tax = (total * 0.1).toFixed(2);
  const grandTotal = total + parseFloat(shipping) + parseFloat(tax);

  return (
    <>
      <img
        className="logo"
        src="https://i.ibb.co/yND0V8v/logo-95f238a5.png"
        alt="img-failed"
      />
      <section className="sticky-top">
        <div className="navbar-container">
          <Link to="/">Shop</Link>
          <Link to="/inventory">Inventory</Link>
          {user?.uid ? (
            <Link to="/profile">Profile</Link>
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
              className="flex items-center"
              onClick={handleShow}
            >
              <FontAwesomeIcon
                className="text-white text-xl md:text-2xl lg:text-3xl ml-4"
                icon={faShoppingCart}
              />
              <sup>
                <Badge>{quantity}</Badge>
              </sup>
            </Button>
            <Offcanvas show={show} onHide={handleClose}>
              <Offcanvas.Header closeButton></Offcanvas.Header>
              <Offcanvas.Body>
                <p className='off-header'>CART</p>
                <div className="flex justify-evenly items-center">
                  <div>
                    <p className="text-xl font-medium">Selected Items:</p>
                    <p className="text-xl font-medium">Total Price: </p>
                    <p className="text-xl font-medium">Shipping Cost:</p>
                    <p className="text-xl font-medium">Tax(10%):</p>
                    <p className="text-xl font-bold">Grand Total:</p>
                  </div>
                  <div>
                    <p className="text-xl font-medium">{quantity}</p>
                    <p className="text-xl font-medium">{totalPrice}</p>
                    <p className="text-xl font-medium">{totalShipping}</p>
                    <p className="text-xl font-medium">{tax}</p>
                    <p className="text-xl font-bold">{grandTotal.toFixed(2)}</p>
                  </div>
                </div>
                <div className='text-center'>
                  <button onClick={clearCart} className="empty-cart-btn">
                    Empty Cart
                  </button>
                </div>
                {/* <h4 className="review-title">Order Review</h4>
                <p>Selected Items: {quantity}</p>
                <p>Total Price: {total}</p>
                <p>Shipping Cost: {shipping}</p>
                <p>Tax(10%): {tax}</p>
                <p>
                  <b>Grand Total: {grandTotal.toFixed(2)}</b>
                </p> */}
              </Offcanvas.Body>
            </Offcanvas>
          </>
        </div>
      </section>
    </>
  );
};

export default Header;
