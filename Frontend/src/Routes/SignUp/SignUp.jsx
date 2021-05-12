import React, { useState, useRef } from "react";
import UserApi from "../../Api/UserApi/UserApi";
import validator from "validator";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Button,
  TextField,
  Paper,
  Typography,
  Link,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({}));

const requiredFieldValue = (value) => {
  if (!value) {
  }
};

const validateEmail = (value) => {};

const validateUsername = (value) => {};

const validatePassword = (value) => {};

const SignUp = () => {
  const form = useRef();
  const submitButton = useRef();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword1, setUserPassword1] = useState("");
  const [userPassword2, setUserPassword2] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegisterChange = (e) => {
    e.preventDefault();
  };
  return <>Signin</>;
};

export default SignUp;
