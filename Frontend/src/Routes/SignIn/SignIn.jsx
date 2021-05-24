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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 1),
  },
}));

const SignIn = (props) => {
  const classes = useStyles();

  const form = useRef();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUserEmail = (e) => {
    const userEmail = e.target.value;
    setUserEmail(userEmail);
  };

  const onChangeUserPassword = (e) => {
    const userPassword = e.target.value;
    setUserPassword(userPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    const data = await userApi.userLogin(userEmail, userPassword);
    console.log("data :", data);
  };

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            ref={form}
            onSubmit={handleLogin}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={userEmail}
              onChange={onChangeUserEmail}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={userPassword}
              onChange={onChangeUserPassword}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In with Facebook
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default SignIn;
