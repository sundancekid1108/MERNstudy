import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Dashboard from '../../../Layouts/Dashboard/Dashboard';
import AccountProfile from './Components/AccountProfile/AccountProfile'
import * as userApi from '../../../Api/UserApi/UserApi';
import styles from './Styles'



const Account = (props) => {
  const { classes } = props;
  const userInfo = useSelector((state) => state.auth.user);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // const getUserInfo = () => {
  //
  // }

  // 유저 정보 불러오기
  const getUserInfo = async () => {
    const fetchedUserData = await userApi.getUserInfo();
    console.log('fetchedUserData', fetchedUserData);
    const userInfo = fetchedUserData.data;
    // return fetchedUserData;
    setUser(userInfo);
  };

  //불러온 유저 정보 props에 저장
  // useEffect(() => {
  //   getUserInfo();
  //   // console.log(user);
  // }, [user._id]);

  return (
    <>
      <Dashboard title="My Account">
        <div className={classes.root}>
          <Grid container spacing={6}>

            <Grid item xs="auto">
              <AccountProfile user={userInfo} />
            </Grid>


          </Grid>
        </div>
      </Dashboard>
    </>
  );
};

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
