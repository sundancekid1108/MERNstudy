import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles, Grid, Typography } from '@material-ui/core';
import Navbar from '../../../Layouts/Public/Components/Navbar/Navbar';
import styles from './Styles';
import ResponsiveMovieCard from '../Components/ResponsiveMovieCard/ResponsiveMovieCard';

import { getMoviesList } from '../../../Store/Actions/Index';
const LatestMoviesList = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const latestMovies = useSelector((state) => state.movies.latestMovies);

  useEffect(() => {
    dispatch(getMoviesList());
  }, []);

  console.log(props);
  return (
    <>
      <div className={classes.root}>
        <Navbar />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h2" color="inherit">
              Latest Movies
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}>
            {latestMovies.map((movie) => (
              <Grid key={movie._id} item className={classes.fullWidth}>
                <ResponsiveMovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default withStyles(styles)(LatestMoviesList);
