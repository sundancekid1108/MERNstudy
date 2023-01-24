import React, { useEffect, useState } from 'react';
import {Grid, Typography, withStyles } from '@material-ui/core';
import styles from './Styles'

const MovieCheckIn = (props) => {

  useEffect(()=> {}, [])

  return (<>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography className={classes.title} variant="h2" color="inherit">
          Check In
        </Typography>
       
      </Grid>
    </Grid>
  </>)
}

export default  withStyles(styles)(MovieCheckIn)