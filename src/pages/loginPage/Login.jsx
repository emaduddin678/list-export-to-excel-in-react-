import React, { useState } from "react";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();
  const { currentUser, login } = useAuth();
  // console.log(user);

  const handleChange = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(userInfo);
    console.log(currentUser, result);

    if (result) {
      console.log("Login success!");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully Logged In!",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/dashboard");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "SAuthentication Fail!!",
        footer: "Try Again",
      });
      setError(true);
      console.log("Authentication Fail!");
    }
  };

  return (
    <div className={classes.bodyWrapper}>
      <div className={classes.wrapper}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className={classes.input_field}>
            <input
              className={classes.inputF}
              name="email"
              onChange={handleChange}
              type="text"
            />
            <label>Enter your email</label>
          </div>
          <div className={classes.input_field}>
            <input name="password" onChange={handleChange} type="password" />
            <label>Enter your password</label>
          </div>
          <div>
            {error && (
              <h1 className={classes.alertMessage}>Authentication Failed! </h1>
            )}
          </div>

          <button type="submit" className={classes.lgbutton}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
