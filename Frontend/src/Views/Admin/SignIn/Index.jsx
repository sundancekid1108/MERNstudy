import React, { useState, useRef, useEffect } from 'react';
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
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import * as userApi from '../../../Api/UserApi/UserApi';
import styles from './Styles.js';

//Redux test
import { useDispatch, useSelector } from 'react-redux';
import * as AuthActions from '../../../Store/Actions/AuthActions';

const SignIn = (props) => {
  const { classes, user } = props;
  // console.log('signin user:', user);
  const state = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const history = useHistory();
  const form = useRef();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const facebook_app_id = process.env.REACT_APP_FACEBOOK_APP_ID;
  const google_app_id = process.env.REACT_APP_GOOGLE_AUTH_ID;

  useEffect(() => {
    //
    if (state.isAuthenticated) {
      return history.push('/');
    } else {
      history.push('/signin');
    }
  }, []);
  //로그인 되있을때 SignIn 접근 차단

  //Redux test

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

  const handleFacebookAuthLogin = () => {
    // console.log('handleFacebookAuthLogin');
  };

  const callbackFacebookAuthLogin = (response) => {
    dispatch(AuthActions.userFacebookAuthLogin(response))
      .then(() => {
        history.push('/admin/dashboard');
      })
      .catch(() => {
        setErrorMessage('Login failed, Check your Email and Password');
      });
  };

  const handleGoogleAuthLogin = () => {
    console.log('handleGoogleAuthLogin');
  };

  const googleAuthSuccess = (response) => {
    console.log('googleAuthSuccess', response);
    // userApi.userGoogleAuthLogin(response);
    dispatch(AuthActions.userGoogleAuthLogin(response))
      .then(() => {
        history.push('/admin/dashboard');
      })
      .catch(() => {
        setErrorMessage('Login failed, Check your Email and Password');
      });
  };

  const googleAuthFailure = (error) => {
    console.log('googleAuthFailure', error);
  };

  /**
   *리액트 Hooks, Redux를 활용한 로그인 구조 개선..
    개선 이유..
    타 컴포넌트에서 props 사용이 어려움

    */

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(AuthActions.userSignIn(userEmail, userPassword))
      .then(() => {
        history.push('/admin/dashboard');
      })
      .catch(() => {
        setErrorMessage('Login failed, Check your Email and Password');
      });
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.content}>
          <div className={classes.contentHeader}>
            <IconButton className={classes.backButton} onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
          </div>
          <div className={classes.contentBody}>
            <form className={classes.form}>
              <Typography className={classes.title} variant="h2">
                Sign in
              </Typography>

              <div className={classes.socialLogin}>
                <FacebookLogin
                  buttonStyle={{ width: '100%' }}
                  autoLoad={false}
                  cookie={false}
                  appId={facebook_app_id}
                  fields="name,email,picture"
                  onClick={handleFacebookAuthLogin}
                  callback={callbackFacebookAuthLogin}
                />
                <GoogleLogin
                  className={classes.googleButton}
                  clientId={google_app_id}
                  buttonText="LOGIN WITH GOOGLE"
                  cookiePolicy={'single_host_origin'}
                  onClick={handleGoogleAuthLogin}
                  onSuccess={googleAuthSuccess}
                  onFailure={googleAuthFailure}
                />
              </div>

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
                <Typography className={classes.errorMessage} variant="body2">
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
      </div>
    </>
  );
};

SignIn.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
