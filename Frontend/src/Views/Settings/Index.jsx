import React, { useState, useEffect } from "react";
import { withStyles, CircularProgress, Typography } from "@material-ui/core";
import Dashboard from "../../Layouts/Dashboard/Dashboard";

const styles = (theme) => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing(20),
  },
});

const Settings = () => {
  return (
    <>
      <Dashboard title="Settings"></Dashboard>
    </>
  );
};

export default withStyles(styles)(Settings);
