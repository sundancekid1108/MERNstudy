import React, { useState, useEffect } from 'react';
import { withStyles, CircularProgress, Typography } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(20)
  }
});

const Settings = () => {
  return (
    <>
      <div>setting</div>
    </>
  );
};

export default withStyles(styles)(Settings);
