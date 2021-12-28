import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Dashboard from '../../../Layouts/Dashboard/Dashboard';
import { AccountProfile, AccountDetails } from './Components/Index';
import * as userApi from '../../../Api/UserApi/UserApi';
const styles = (theme) => ({
  root: {
    padding: theme.spacing(4)
  }
});

const Account = (props) => {
  const { classes } = props;
  const [user, setUser] = useState({});
  const history = useHistory();

  //유저 정보 불러오기
  const getUserInfo = async () => {
    const fetchedUserData = await userApi.getUserInfo();
    console.log('fetchedUserData', fetchedUserData);
    const userInfo = fetchedUserData.data;
    // return fetchedUserData;
    setUser(userInfo);
  };

  //불러온 유저 정보 props에 저장
  useEffect(() => {
    getUserInfo();
    // console.log(user);
  }, [user._id]);

  return (
    <>
      <Dashboard title="My Account">
        <div className={classes.root}>
          <Grid container spacing={6}>
            {/* <AccountProfile user={user} /> */}
            <Grid item lg={4} md={6} xl={5} xs={12}>
              <AccountProfile user={user} />
            </Grid>

            {/* <Grid item lg={8} md={6} xl={7} xs={12}>
              <AccountDetails user={user} />
            </Grid> */}
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
