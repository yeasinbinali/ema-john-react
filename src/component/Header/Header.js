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

const Header = () => {
  const [cart, setCart] = useState([]);
  const { user, logOutUser } = useContext(AuthContext);
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
    total = total + selectedCart.price * selectedCart.quantity;
    shipping = shipping + selectedCart.shipping;
  }

  const tax = (total * 0.1).toFixed(2);
  const grandTotal = total + shipping + parseFloat(tax);

  return (
    <section>
      <div>
        <img
          className="logo"
          src="https://i.ibb.co/yND0V8v/logo-95f238a5.png"
          alt="https://images-na.ssl-images-amazon.com/images/I/416UTZJ0FbL._AC_US218_.jpg"
        />
      </div>
      <div className="navbar-container">
        <Link to="/">Shop</Link>
        <Link to="/inventory">Inventory</Link>
        {user?.uid ? (
          <Link to='/profile'>Profile</Link>
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
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body className="text-center">
              <h4
                className="review-title text-center text-4xl font-bold"
                style={{ color: "rgb(255, 145, 0)" }}
              >
                Cart
              </h4>
              <div className="flex justify-evenly my-3">
                <div className="text-start">
                  <p className="text-xl font-medium">Selected Items:</p>
                  <p className="text-xl font-medium">Total Price:</p>
                  <p className="text-xl font-medium">Shipping Cost:</p>
                  <p className="text-xl font-medium">Tax(10%):</p>
                  <p className="text-xl font-bold">Grand Total:</p>
                </div>
                <div className="text-start">
                  <p className="text-xl font-medium">{quantity}</p>
                  <p className="text-xl font-medium">${total}</p>
                  <p className="text-xl font-medium">${shipping}</p>
                  <p className="text-xl font-medium">${tax}</p>
                  <p className="text-xl font-bold">${grandTotal.toFixed(2)}</p>
                </div>
              </div>
              <button onClick={clearCart} className="empty-cart-btn">
                Empty Cart
              </button>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      </div>
    </section>
  );
};

export default Header;
