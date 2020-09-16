import React from "react";
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

const SignUp = () => {
  return (
    <>
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
                  autoFocus
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
                  autoFocus
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
                  autoFocus
                />
              </Grid>
              <Button variant="contained" color="inherit">
                SIGNUP
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SignUp;
