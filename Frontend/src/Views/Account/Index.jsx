import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Dashboard from "../../Layouts/Dashboard/Dashboard";
import { AccountProfile, AccountDetails } from "./Components/Index";
import * as userApi from "../../Api/UserApi/UserApi";
import { Button } from "@material-ui/core";
const styles = (theme) => ({
  root: {
    padding: theme.spacing(4),
  },
});

const Account = (props) => {
  const [user, setUser] = useState([]);
  const { classes } = props;

  useEffect(async () => {
    const result = await userApi.getUserInfo();
    console.log("result : ", result);
  });

  return (
    <>
      <Dashboard title="My Account">
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={4} md={6} xl={4} xs={12}>
              <AccountProfile user={user} />
            </Grid>
            <Grid item lg={8} md={6} xl={8} xs={12}>
              <AccountDetails user={user} />
            </Grid>
          </Grid>
        </div>
      </Dashboard>
    </>
  );
};

export default withStyles(styles)(Account);
