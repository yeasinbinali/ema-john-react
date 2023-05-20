import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
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

  const { data: savedCart=[], refetch } = useQuery(["cart"], () => {
    fetch("https://ema-john-server-eosin.vercel.app/productsByIds", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
    .then((res) => res.json())
    .then(data => {
      for (const id in storedCart) {
        const addedProduct = data?.find((product) => product._id === id);
        if (addedProduct) {
          const quantity = storedCart[id];
          addedProduct.quantity = quantity;
          savedCart.push(addedProduct);
        }
      }
      setCart(savedCart);
      refetch();
    })
  });

  const clearCart = () => {
    setCart([]);
    deleteFromLocalStorage();
  };

  let total = 0;
  let quantity = 0;
  let shipping = 0;

  for (const selectedCart of cart) {
    quantity = quantity + selectedCart.quantity;
    shipping = shipping + selectedCart.shipping;
    total = total + selectedCart.price * selectedCart.quantity + shipping;
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
          <Offcanvas className='text-center' show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <p className='text-2xl text-center font-bold' style={{color: 'rgb(255, 145, 0)'}}>Cart</p>
              <p className='text-xl'>Selected Items: {quantity}</p>
              <p className='text-xl'>Shipping Cost: {shipping}</p>
              <p className='text-xl'>Total Before Tax: {total}</p>
              <p className='text-xl'>Tax(10%): {tax}</p>
              <p className='text-xl font-bold'> 
                Grand Total: {grandTotal.toFixed(2)}
              </p>
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
