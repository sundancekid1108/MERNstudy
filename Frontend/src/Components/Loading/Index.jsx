// @ts-nocheck
import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './Styles';
const Loading = (props) => {
  const { classes } = props;
  return <div className={classes.root} />;
};

export default withStyles(styles)(Loading);
