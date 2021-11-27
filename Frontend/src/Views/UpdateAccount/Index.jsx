import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import {
  Button,
  TextField,
  CircularProgress,
  Typography
} from '@material-ui/core';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from '../../Components/Index';
import Dashboard from '../../Layouts/Dashboard/Index';
import * as userApi from '../../Api/UserApi/UserApi';

import styles from './Styles';

const AccountDetails = (props) => {
  const { user, classes, className, ...rest } = props;
  console.log('AccountDetailsUser : ', user);
  const rootClassName = classNames(classes.root, className);

  const history = useHistory();

  const [userName, setUserName] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');

  const [userEmail, setUserEmail] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [userPassword, setUserPasword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const form = useRef();

  // const setDefaultState = () => {
  //   // setUserName(user.username);
  //   // setUserFirstName(user.firstname);
  //   // setUserLastName(user.lastname);
  //   // setUserEmail(user.email);
  //   // setUserPhoneNumber(user.phonenumber);
  // };
  // useEffect(() => {
  //   setDefaultState();
  // }, [user.username]);

  const onChangeUserName = (e) => {
    const data = e.target.value;
    setUserName(data);
  };
  const onChangeUserFirstName = (e) => {
    const data = e.target.value;
    setUserFirstName(data);
  };
  const onChangeUserLastName = (e) => {
    const data = e.target.value;
    setUserLastName(data);
  };
  const onChangeUserEmail = (e) => {
    const data = e.target.value;
    setUserEmail(data);
  };
  const onChangeUserPhoneNumber = (e) => {
    const data = e.target.value;
    setUserPhoneNumber(data);
  };
  const onChangeUserPassword = (e) => {
    const data = e.target.value;
    setUserPasword(data);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const result = await userApi.updateUserInfo(
      userName,
      userEmail,
      userFirstName,
      userLastName,
      userPhoneNumber,
      userPassword
    );
    console.log('Account detail result : ', result);
    history.push('/admin/account');
  };

  return (
    <>
      <Portlet {...rest} className={rootClassName}>
        <PortletHeader>
          <PortletLabel
            subtitle="The information can be updated"
            title="Profile"
          />
        </PortletHeader>
        <PortletContent noPadding>
          <form ref={form} onSubmit={handleUpdateProfile} noValidate>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                // helperText="Please specify the first name"
                label="UserName"
                margin="dense"
                value={userName}
                variant="outlined"
                onChange={onChangeUserName}
              />

              <TextField
                className={classes.textField}
                // helperText="Please specify the first name"
                label="First name"
                margin="dense"
                value={userFirstName}
                variant="outlined"
                onChange={onChangeUserFirstName}
              />

              <TextField
                className={classes.textField}
                label="Last name"
                margin="dense"
                value={userLastName}
                variant="outlined"
                onChange={onChangeUserLastName}
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Email Address"
                margin="dense"
                value={userEmail}
                variant="outlined"
                onChange={onChangeUserEmail}
              />
              <TextField
                className={classes.textField}
                label="Phone Number"
                margin="dense"
                type="text"
                value={userPhoneNumber}
                variant="outlined"
                onChange={onChangeUserPhoneNumber}
              />

              <TextField
                className={classes.textField}
                label="Password"
                margin="dense"
                type="password"
                value={userPassword}
                variant="outlined"
                onChange={onChangeUserPassword}
              />
            </div>
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
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
              color="primary"
              variant="contained"
              disabled={!isValid}
              onClick={handleUpdateProfile}>
              UPDATE PROFILE
            </Button>
          )}
        </PortletFooter>
      </Portlet>
    </>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountDetails);
