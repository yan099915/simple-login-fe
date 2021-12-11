import "./HomeScreen.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const HomeScreen = () => {
  const status = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    // Update the document title using the browser API
    if (status === null) {
      navigate("/");
    }
  });

  const notify = (message) => {
    toast("Logged Out");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="body">
      <h1>Home Page</h1>
      <div className="logout">
        <button onClick={notify}>Sign Out</button>
      </div>
      <ToastContainer theme="light" position="bottom-center" />
    </div>
  );
};
export default HomeScreen;
