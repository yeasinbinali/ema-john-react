import React, { useContext } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../UserContext/UserContext";

const Header = () => {
  const { user, logOutUser } = useContext(AuthContext);
  return (
    <section>
      <img
        className="logo"
        src="https://i.ibb.co/yND0V8v/logo-95f238a5.png"
        alt="img-failed"
      />
      <div className='navbar-container'>
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
      </div>
    </section>
  );
};

export default Header;
