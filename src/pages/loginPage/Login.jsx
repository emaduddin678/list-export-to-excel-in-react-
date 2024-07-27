import React, { useState } from "react";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Login = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();
  const user = useAuth();
  // console.log(user);

  const handleChange = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  }
  const handleSubmit = (e) => {
    e.preventDefault();


    axios
      .post("/login", getFormData(userInfo))
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        setError(false);
        if (response.status === 200 && user.login(response.data.message)) {
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        setError(true);
        console.log(error);
        if (error.response.status === 422) {
          setErrorMessage(error.response.data.message);
        }
      });
    // setError(false);
    // if (user.login(userInfo.email, userInfo.password) === "success") {
    //   navigate("/dashboard");
    // } else {
    //   setError(true);
    // }
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
