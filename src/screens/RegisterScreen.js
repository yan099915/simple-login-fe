import "./LoginScreen.css";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const RegisterForm = () => {
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
    navigate("/");
  };

  const notify = (message) => {
    toast(message);
  };

  let onSubmit = (result) => {
    let myArray = Object.values(result);
    email = myArray[0];
    password = myArray[1];
    const BASE_URL = process.env.REACT_APP_API_URL + "register";

    try {
      const data = { email: email, password: password };
      fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
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
      <h1>Sign Up</h1>
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
          <input className="submit" type="submit" value="Create New Account" />
        </form>
        <input
          className="register"
          type="button"
          onClick={redirect}
          value="Back"
        />
      </div>
      <ToastContainer theme="light" position="bottom-center" />
    </div>
  );
};
export default RegisterForm;
