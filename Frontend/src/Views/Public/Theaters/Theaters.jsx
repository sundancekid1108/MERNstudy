import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, Grid, Typography } from '@material-ui/core';
import Navbar from '../../../Layouts/Public/Components/Navbar/Navbar';
import { getTheatersList } from '../../../Store/Actions/Index';
import styles from './Styles';

const Theaters = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const theaters = useSelector((state) => state.theaters.theaters);

  useEffect(() => {
    dispatch(getTheatersList());
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Navbar />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h2" color="inherit">
              Theaters
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            direction="column"
            alignItems="center"
            justify="center"
            spacing={2}>
            {theaters.map((theater) => (
              <Grid key={theater._id} item>
                id: {theater._id} <br />
                name: {theater.theaterName}
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

Theaters.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(Theaters);
