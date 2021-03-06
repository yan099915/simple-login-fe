import "./LoginScreen.css";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  let email = "";
  let password = "";
  const navigate = useNavigate();

  const status = localStorage.getItem("token");

  useEffect(() => {
    // Update the document title using the browser API
    if (status !== null) {
      navigate("/home");
    }
  });

  const redirect = () => {
    navigate("/register");
  };

  const notify = (message) => {
    toast(message);
  };

  let onSubmit = (result) => {
    let myArray = Object.values(result);
    email = myArray[0];
    password = myArray[1];
    const BASE_URL = process.env.REACT_APP_API_URL + "login";

    try {
      fetch(BASE_URL, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          email: email,
          password: password,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.accessToken) {
            notify(data.message);
            localStorage.setItem("token", data.accessToken);
            navigate("/home");
          } else {
            notify(data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form">
      <h1>Sign In</h1>
      <div className="form-input">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>Email</p>
          <input
            className="email"
            placeholder="Type your email"
            {...register("email", { required: true })}
          />
          <p>Password</p>
          <input
            className="password"
            type="password"
            placeholder="Type your password"
            {...register("password", { required: true })}
          />
          <input className="submit" type="submit" value="Sign In" />
        </form>
        <p className="question">Don't have an account ?</p>
        <input
          className="register"
          type="button"
          onClick={redirect}
          value="Sign Up"
        />
      </div>
      <ToastContainer theme="light" position="bottom-center" />
    </div>
  );
};
export default LoginForm;
