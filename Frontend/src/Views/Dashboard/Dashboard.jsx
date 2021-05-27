import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import withRoot from "../../withRoot";
import Dashboard from "../../Layouts/Dashboard/Dashboard";

const styles = (theme) => ({
  root: {
    textAlign: "center",
    paddingTop: theme.spacing.unit * 20,
  },
});

const DashboardPage = () => {
  return (
    <>
      return (<Dashboard title="Admin Dashboard"></Dashboard>)
    </>
  );
};

export default withStyles(styles)(DashboardPage);
