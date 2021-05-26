import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  CssBaseline,
  Grid,
  Button,
  Paper,
  Input,
  TextField,
  Form,
  Typography,
  Link,
  Avatar,
  FormControlLabel,
  Checkbox,
  Box,
} from "@material-ui/core";
import * as userApi from "../../Api/UserApi/UserApi";
import "./Signin.css";

const SignIn = (props) => {
  // const form = useRef();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activePanel, setActivePanel] = useState("left");

  const onChangeUserEmail = (e) => {
    const userEmail = e.target.value;
    setUserEmail(userEmail);
  };

  const onChangeUserPassword = (e) => {
    const userPassword = e.target.value;
    setUserPassword(userPassword);
  };

  const onPanelChangeRight = (e) => {
    setActivePanel("right");
  };

  const onPanelChangeLeft = (e) => {
    setActivePanel("left");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    const responseData = await userApi.userLogin(userEmail, userPassword);

    if (!responseData.accessToken) {
      setErrorMessage("Check your Email and Password");
    }
  };

  return (
    <>
      <div className="login-page">
        <div
          className={`container ${
            activePanel === "right" && "right-panel-active"
          }`}
          id="container"
        >
          <div className="form-container sign-up-container">
            <form action="#">
              <h1>Create Account</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
              </div>
              <span>or use your email for registration</span>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <button>Sign Up</button>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form onSubmit={(e) => this.onUserLogin(e)}>
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="#" className="social">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social">
                  <i className="fab fa-google-plus-g"></i>
                </a>
              </div>
              <span>or use your account</span>
              <input type="text" placeholder="Email" />
              <input type="password" placeholder="Password" />
              {/* {this.state.error && (
                <span style={{ color: "red" }}>{this.state.error}</span>
              )} */}
              <a href="#">Forgot your password?</a>
              <button>Sign In</button>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>Sign in Here</p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={onPanelChangeLeft}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Sign Up here</p>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={onPanelChangeRight}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
