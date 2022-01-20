import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles, Grid, Typography } from '@material-ui/core';
import Navbar from '../../../Layouts/Public/Components/Navbar/Navbar';
import styles from './Styles';
import ResponsiveMovieCard from '../Components/ResponsiveMovieCard/ResponsiveMovieCard';
import * as MovieAction from '../../../Store/Actions/MoviesActions';

const MovieList = (props) => {
  console.log('MovielistProps', props);
  const { classes } = props;
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const latestMovies = useSelector((state) => state.movies.latestMovies);
  const category = props.match.params.category;

  const getMoviesList = () => {
    dispatch(MovieAction.getMoviesList());
  };
  useEffect(() => {
    getMoviesList();
  }, []);

  console.log('category', category);
  console.log('movies', movies);
  if (!movies) {
    return (
      <>
        <div className={classes.root}>
          <Navbar />
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h2" color="inherit">
              Movies Data missing
            </Typography>
          </Grid>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={classes.root}>
          <Navbar />
          <Grid container spacing={2}>
            {!['nowShowing', 'comingSoon'].includes(category) ? (
              <Grid item xs={12}>
                <Typography
                  className={classes.title}
                  variant="h2"
                  color="inherit">
                  No Category Data
                </Typography>
              </Grid>
            ) : (
              <>
                <Grid item xs={12}>
                  <Typography
                    className={classes.title}
                    variant="h2"
                    color="inherit">
                    Movie List
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
                  {movies.map((movie) => (
                    <Grid key={movie._id} item className={classes.fullWidth}>
                      <ResponsiveMovieCard movie={movie} />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Grid>
        </div>
      </>
    );
  }
};

export default withStyles(styles)(MovieList);
