import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import * as userApi from '../../../../../Api/UserApi/UserApi';
import styles from './Styles.js';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthAction from '../../../../../Store/Actions/AuthAction';

const SignInForm = (props) => {

  const { classes, user } = props;
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useRef();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const facebook_app_id = process.env.REACT_APP_FACEBOOK_APP_ID;
  const google_app_id = process.env.REACT_APP_GOOGLE_AUTH_ID;



  const onChangeUserEmail = (e) => {
    const userEmail = e.target.value;
    setUserEmail(userEmail);
  };

  const onChangeUserPassword = (e) => {
    const userPassword = e.target.value;
    setUserPassword(userPassword);
  };


  //social login 처리
  const handleFacebookAuthLogin = () => {
    // console.log('handleFacebookAuthLogin');
  };

  const callbackFacebookAuthLogin = (response) => {
    dispatch(AuthAction.userFacebookAuthLogin(response))
      .then((response) => {
        console.log(response.data.isAdmin);
        if (response.data.isAdmin == true) {
          navigate('/admin/dashboard', { replace: false });
        } else {
          navigate('/', { replace: false });
        }
      })
      .catch((error) => {
        setErrorMessage('Login failed, Check your Email and Password');
      });
  };

  const handleGoogleAuthLogin = () => {
    // console.log('handleGoogleAuthLogin');
  };

  const googleAuthSuccess = async (response) => {
    userApi.userGoogleAuthLogin(response);
    dispatch(AuthAction.userGoogleAuthLogin(response))
      .then((response) => {
        console.log(response.data.isAdmin);
        if (response.data.isAdmin == true) {
          navigate('/admin/dashboard', { replace: false });
        } else {
          navigate('/', { replace: false });
        }
      })
      .catch((error) => {
        setErrorMessage('Login failed, Check your Email and Password');
      });
  };

  const googleAuthFailure = (error) => {
    // console.log('googleAuthFailure', error);
  };

  /**
   *리액트 Hooks, Redux를 활용한 로그인 구조 개선..
   개선 이유..
   타 컴포넌트에서 props 사용이 어려움

   */

  const handleSignIn = () => {
    const body = { userEmail, userPassword };

    dispatch(AuthAction.userSignIn(body))
      .then((response) => {
        console.log(response.data.isAdmin);
        if (response.data.isAdmin === true) {
          navigate('/admin/dashboard', { replace: false });
        } else if (response.data.isAdmin === false)
          navigate('/', { replace: false });
        else {
          navigate('/signin', { replace: false });
        }
      })
      .catch((error) => {
        setErrorMessage('Login failed, Check your Email and Password');
        console.log("handleSignin Error")
      });
  };


  return (
    <>
      <form className={classes.form}>
        <Typography className={classes.title} variant="h2">
          SIGN IN
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
          <Link to={'/signup'} className={classes.signUpUrl} >
            Sign up
          </Link>
        </Typography>
      </form>


    </>)
}

export default withStyles(styles)(SignInForm);