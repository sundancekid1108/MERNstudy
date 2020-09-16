import React, { useState } from "react";
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

const Login = () => {
  return (
    <>
      <div>
        <Container>
          <Grid container justify="center" wrap="wrap">
            <Grid container spacing={0} justify="center" direction="row" Grid>
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
                    name="username"
                    variant="outlined"
                    required
                    autoFocus
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type="text"
                    placeholder="Password"
                    fullWidth
                    name="username"
                    variant="outlined"
                    required
                    autoFocus
                  />
                </Grid>
                <Button center variant="contained" color="inherit">
                  Login
                </Button>
                <Button
                  center
                  variant="contained"
                  color="inherit"
                  a
                  href="/signup"
                >
                  SIGNUP
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Login;
