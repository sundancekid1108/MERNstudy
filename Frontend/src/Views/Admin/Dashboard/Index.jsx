import React from 'react';
import { withStyles } from '@material-ui/core';
import Dashboard from '../../../Layouts/Dashboard/Index';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(20)
  }
});

const DashboardPage = () => {
  return (
    <>
      <Dashboard title="Admin Dashboard"></Dashboard>
    </>
  );
};

export default withStyles(styles)(DashboardPage);
