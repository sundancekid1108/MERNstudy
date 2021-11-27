import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import moment from 'moment';
import { Grid, GridList, Typography } from '@material-ui/core';
import styles from './Styles';
import MovieCard from '../MovieCard/Index';
import ResponsiveMovieCard from '../ResponsiveMovieCard/Index';
import * as MovieApi from '../../../../../Api/MovieApi/MovieApi';

const MoviesList = (props) => {
  const { classes, movies } = props;

  // const nowTime = moment().format('YYYY-MM-DD');

  return (
    <>
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={12}>
          <Grid
            className={classes.fullHeight}
            container
            direction="column"
            alignItems="center"
            justify="center"
            spacing={2}>
            <Typography className={classes.title} variant="h2" color="inherit">
              All Movies
            </Typography>
            {movies.map((movie) => (
              <Grid key={movie._id} item xs className={classes.fullWidth}>
                <ResponsiveMovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

MoviesList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired
};

export default withStyles(styles)(MoviesList);
