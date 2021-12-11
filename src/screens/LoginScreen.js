import "./LoginScreen.css";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  let email = "";
  let password = "";
  const notify = (message) => {
    toast(message);
  };
  let onSubmit = (result) => {
    let myArray = Object.values(result);
    email = myArray[0];
    password = myArray[1];
    console.log(myArray);
    const BASE_URL = process.env.REACT_APP_API_URL + "login";
    console.log(BASE_URL);
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
          console.log(data);
          if (data.accessToken) {
            notify(data.message);
            // console.log(data.accessToken);
            sessionStorage.setItem("token", data.accessToken);
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
      <h1>Login</h1>
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
            placeholder="Type your password"
            {...register("password", { required: true })}
          />
          <input className="submit" type="submit" value="Sign In" />
        </form>
        <p>Don't have an account ?</p>
        <input className="register" type="button" value="Sign Up" />
      </div>
      <ToastContainer theme="light" position="bottom-center" />
    </div>
  );
};
export default LoginForm;
