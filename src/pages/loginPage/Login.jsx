import React, { useState } from "react";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [userInfo, setUserInfo] = useState({});
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const user = useAuth();
  // console.log(user);

  const handleChange = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    if (user.login(userInfo.email, userInfo.password) === "success") {
      navigate("/dashboard");
    } else {
      setError(true);
    }
  };
  return (
    <div className={classes.bodyWrapper}>
      <div className={classes.wrapper}>
        {" "}
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
