import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Grid, Typography } from '@material-ui/core';
import styles from './Styles';
import MovieCard from '../MovieCard/Index';
import ResponsiveMovieCard from '../ResponsiveMovieCard/Index';

const TotalMoviesList = (props) => {
  const { classes, movies } = props;

  return (
    <>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h2" color="inherit">
            All Movies
          </Typography>
        </Grid>
        <Grid
          className={classes.fullHeight}
          container
          item
          xs={12}
          direction="column"
          alignItems="center"
          justify="center"
          spacing={2}>
          {movies.map((movie) => (
            <Grid key={movie._id} item className={classes.fullWidth}>
              <ResponsiveMovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

TotalMoviesList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired
};

export default withStyles(styles)(TotalMoviesList);
