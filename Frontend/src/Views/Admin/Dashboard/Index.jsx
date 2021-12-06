import React from 'react';
import { withStyles } from '@material-ui/core';
import Dashboard from '../../../Layouts/Dashboard/Index';
import styles from './Styles';

const DashboardPage = () => {
  return (
    <>
      <Dashboard title="Admin Dashboard"></Dashboard>
    </>
  );
};

export default withStyles(styles)(DashboardPage);
