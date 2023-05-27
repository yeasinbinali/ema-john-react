import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../UserContext/UserContext";
import "./Login.css";

const Login = () => {
  const [error, setError] = useState("");
  const { signInUser, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const form = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(form, {replace: true});
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
    .then(result => {
      const user = result.user;
      console.log(user);
      navigate(form, {replace: true});
    })
    .catch(error => {
      setError(error.message);
    })
  }

  return (
    <form
      className="w-50 mx-auto border-2 rounded p-3 my-5 text-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="font-bold">Login</h3>
      <div className="my-3">
        <input
          className="input-xl w-100 border-2 p-2"
          type="email"
          placeholder="Your Email"
          {...register("email", { required: true })}
        />
        {errors.email?.type === "required" && (
          <small className="text-red-600" role="alert">
            Email Address is required
          </small>
        )}
      </div>
      <div>
        <input
          className="input-xl w-100 border-2 p-2"
          type="password"
          placeholder="Your Password"
          {...register("password", { pattern: /^[A-Za-z]+$/i })}
        />
        {errors.password?.type === "required" && (
          <small className="text-red-600" role="alert">
            Password is required
          </small>
        )}
      </div>
      {error && <small className='text-red-600'>{error}</small>}
      <p className="m-0">
        New to Ema-John? Please <Link to="/signup">SIGNUP</Link>
      </p>
      <input className="login-btn p-2 mb-2" type="submit" />
      <br />
      <strong>OR</strong>
      <br />
      <button onClick={handleGoogleSignIn} className="btn-outline border-2 p-2 mt-2 w-100">
        Google Sign-In
      </button>
    </form>
  );
};

export default Login;
