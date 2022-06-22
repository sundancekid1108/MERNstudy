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
import SignInForm from './Components/SignInForm/SignInForm'
import styles from './Styles.js';

//Redux test
import { useDispatch, useSelector } from 'react-redux';
import * as AuthAction from '../../../Store/Actions/AuthAction';

const SignIn = (props) => {
  const { classes, user } = props;
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


  //뒤로가기 처리
  const handleBack = () => {
    history.goBack();
  };




  return (
    <>

      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.bgWrapper} item lg={5}>
            <div className={classes.bg} />
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.contentHeader}>

              <IconButton
                className={classes.backButton} onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <SignInForm redirect />
            </div>
          </Grid>
        </Grid>
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
