import React, { useState, useRef } from "react";
import UserApi from '../../Api/UserApi/UserApi';
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
  const [successful, setSuccessful]= useState(false);
  const [message, setMessage] = useState("");
  


  const handleRegisterChange = (e) => {
    e.preventDefault();

    
  }
  return (

    <>
      <Container>
        <Grid container justify="center" wrap="wrap">
          <Grid container spacing={0} justify="center" direction="row" Grid>
            <form onSubmit={handleRegisterChange} ref={form}>
              <Paper
                variant="elevation"
                elevation={4}
                className="login-background"
              >
                <Grid item>
                  <TextField
                    type="email"
                    placeholder="Email"
                    fullWidth
                    name="email"
                    variant="outlined"
                    required
                    autoFocus
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type="email"
                    placeholder="Username"
                    fullWidth
                    name="username"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type="password"
                    placeholder="Password"
                    fullWidth
                    name="username"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type="password"
                    placeholder="Check Password"
                    fullWidth
                    name="username"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Button variant="contained" color="inherit">
                  SIGNUP
                </Button>
              </Paper>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SignUp;
