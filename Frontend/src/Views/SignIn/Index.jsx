import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import {
  Grid,
  Button,
  IconButton,
  CircularProgress,
  TextField,
  Typography
} from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import * as userApi from '../../Api/UserApi/UserApi';
import styles from './Styles.js';

const SignIn = (props) => {
  const { classes } = props;
  const form = useRef();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const onChangeUserEmail = (e) => {
    const userEmail = e.target.value;
    setUserEmail(userEmail);
  };

  const onChangeUserPassword = (e) => {
    const userPassword = e.target.value;
    setUserPassword(userPassword);
  };

  //뒤로가기 처리
  const handleBack = () => {
    history.goBack();
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    const responseData = await userApi.userLogin(userEmail, userPassword);
    // console.log(responseData);
    if (responseData.accessToken) {
      // console.log("loginSuccess!!");
      setIsValid(false);
      history.push('/dashboard');
    } else {
      setIsLoading(false);
      setIsValid(true);
      setErrorMessage('Login failed, Check your Email and Password');
    }
  };

  return (
    <>
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.quoteWrapper} item lg={5}>
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <Typography className={classes.quoteText} variant="h1">
                  Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
                  they sold out High Life.
                </Typography>
                <div className={classes.person}>
                  <Typography className={classes.name} variant="body1">
                    Takamaru Ayako
                  </Typography>
                  <Typography className={classes.bio} variant="body2">
                    Manager at inVision
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton className={classes.backButton} onClick={handleBack}>
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className={classes.contentBody}>
                <form
                  className={classes.form}
                  ref={form}
                  onSubmit={handleSignIn}>
                  <Typography className={classes.title} variant="h2">
                    Sign in
                  </Typography>

                  <div className={classes.fields}>
                    <TextField
                      className={classes.textField}
                      label="Email"
                      name="email"
                      onChange={onChangeUserEmail}
                      type="text"
                      value={userEmail}
                      variant="outlined"
                      autoFocus
                    />
                    <TextField
                      className={classes.textField}
                      label="Password"
                      name="password"
                      onChange={onChangeUserPassword}
                      type="password"
                      value={userPassword}
                      variant="outlined"
                    />
                  </div>
                  {/* Error Message  */}
                  {errorMessage && (
                    <Typography
                      className={classes.errorMessage}
                      variant="body2">
                      {errorMessage}
                    </Typography>
                  )}

                  {/* Loding bar */}
                  {isLoading ? (
                    <CircularProgress className={classes.progress} />
                  ) : (
                    <Button
                      className={classes.signInButton}
                      color="primary"
                      disabled={!isValid}
                      onClick={handleSignIn}
                      size="large"
                      variant="contained">
                      Sign in now
                    </Button>
                  )}
                  <Typography className={classes.signUp} variant="body1">
                    Don't have an account?{' '}
                    <Link className={classes.signUpUrl} to="/signup">
                      Sign up
                    </Link>
                  </Typography>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default withStyles(styles)(SignIn);
