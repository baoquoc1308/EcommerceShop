import React, { useState, useEffect } from "react";
import { fetchApi } from "../../api/api";
import { useNavigate } from "react-router-dom";
import "../Login/index.scss";
import { useNotification } from "../Notification";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [display, setDisplay] = useState("hidden");
  const navigate = useNavigate();
  const notification = useNotification();
  props.myFun(false);
  props.myFun2(false);

  const handleResponseLogin = (data) => {
    localStorage.setItem("accessToken", data?.token);
    localStorage.setItem("dataUser", JSON.stringify(data));
    data && notification.success("Login successfully!", 3000);
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const handleError = (data) => {
    notification.error(data?.message || "Something went wrong!", 3000);
  };

  const handleLogin = () => {
    fetchApi(
      "POST",
      "https://dummyjson.com/auth",
      "login",
      handleResponseLogin,
      handleError,

      { username: email, password: password }
    );
  };

  const register = () => {
    if (display === "hidden") {
      setDisplay("inline-block");
    } else {
      setDisplay("hidden");
    }
  };

  return (
    <div className="grid login-container">
      <div
        className={`flex flex-col  shadow-xl align-middle my-36 md:w-80 md:mx-auto rounded-xl mx-10 bg-gray-200 `}
      >
        <h2 className="text-center mt-2">
          {display === "hidden"
            ? "Not Registered?"
            : "Already have an account?"}
          <span className={`text-blue-600 cursor-pointer`} onClick={register}>
            Click here
          </span>
        </h2>
        <h1 className="text-2xl my-4 text-center font-semibold">Sign in</h1>
        <div className="mx-4">
          <h3 className="my-2">Email address</h3>
          <input
            type="text"
            placeholder="Enter email"
            className="my-2  rounded-md w-full p-2 text-black"
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="my-2">Password</h3>
          <input
            type="password"
            placeholder="Enter password"
            className="my-2 rounded-md w-full p-2 text-black"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* for registering */}
          <div className={`${display} w-full`}>
            <h3 className="my-2">Confirm Password</h3>
            <input
              type="password"
              placeholder="Confirm password"
              className="my-2 rounded-md w-full p-2 text-black"
            />
            <h3 className="my-2">Enter Full Name</h3>
            <input
              type="text"
              placeholder="Enter Name"
              className="my-2 rounded-md w-full p-2 text-black"
            />
          </div>
          <h1 className="flex my-2">
            <input type="checkbox" name="Remember me" id="" placeholder="" />
            <h2 className="mx-3">Remember me</h2>
          </h1>
          <button
            className="my-3 text-center bg-blue-600 w-full rounded-lg text-white p-2"
            onClick={handleLogin}
          >
            Submit
          </button>
          <h5
            className={`text-right my-2 ${
              display === "hidden" ? "inline-block" : "hidden"
            }`}
          >
            Forgot{" "}
            <span className={`text-blue-600 cursor-pointer`}>password?</span>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Login;
