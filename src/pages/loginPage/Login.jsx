import React from "react";
import classes from "./Login.module.css";

const Login = () => {
  return (
    <div className={classes.bodyWrapper}>
      <div className={classes.wrapper}>
        {" "}
        <form className={classes.form}>
          <h2>Login</h2>
          <div className={classes.input_field}>
            <input className={classes.inputF} type="text" required />
            <label>Enter your email</label>
          </div>
          <div className={classes.input_field}>
            <input type="password" required />
            <label>Enter your password</label>
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
