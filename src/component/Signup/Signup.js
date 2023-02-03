import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../UserContext/UserContext";
import "./Signup.css";

const Signup = () => {
  const [error, setError] = useState("");
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const confirm = form.confirm.value;
    const password = form.password.value;
    console.log(email, password, confirm);

    if(password.length < 6){
        setError("Your password should be 6 characters & more")
    }

    if (password !== confirm) {
      setError("Password did not match");
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        navigate('/');
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="form-container">
      <h3 className="form-title">Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-detail">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="enter email" required />
        </div>
        <div className="form-detail">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            required
          />
        </div>
        <div className="form-detail">
          <label htmlFor="confirm">Confirm Password</label>
          <input
            type="password"
            name="confirm"
            placeholder="password"
            required
          />
        </div>
        <p style={{ color: "red"}}>{error}</p>
        <button className="btn-submit" type="submit">
          Submit
        </button>
      </form>
      <p className="form-another">
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <p className="or-section">------------------ or --------------------</p>
      <button className="google-btn">Continue to Google</button>
    </div>
  );
};

export default Signup;
