import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Dashboard from '../../../Layouts/Dashboard/Dashboard';
import AccountProfile from './Components/AccountProfile/AccountProfile'
import  * as AuthAction from '../../../Store/Actions/AuthAction'
import * as userApi from '../../../Api/UserApi/UserApi';
import styles from './Styles'

const Account = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();

  // const [userInfo, setUserInfo] = useState({});
  const history = useHistory();
  const userInfo = useSelector((state) => state.auth.user);




  //유저 정보 불러오기
  // const getUserInfo = async () => {
  //   const fetchedUserData = await userApi.getUserInfo();
  //   console.log('fetchedUserData', fetchedUserData);
  //   const userInfo = fetchedUserData.data;
  //   console.log(userInfo)
  //   // return fetchedUserData;
  //   setUserInfo(userInfo);
  // };

  //불러온 유저 정보 props에 저장
  useEffect(() => {
    // getUserInfo();
    dispatch(AuthAction.getLoginUserInfo())
    // console.log(user);
  }, [userInfo._id]);

  return (
    <>
      <Dashboard title="My Account">
        <div className={classes.root}>
          <Grid container spacing={6}>
            {/* <AccountProfile user={user} /> */}
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
