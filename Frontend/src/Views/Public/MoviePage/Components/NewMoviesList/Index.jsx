import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import { Grid, GridList, ImageList, Typography } from '@material-ui/core';
import styles from './Styles';
import MovieCard from '../MovieCard/Index';
import * as MovieApi from '../../../../../Api/MovieApi/MovieApi';

const NewMoviesList = (props) => {
  const { classes, movies } = props;

  const nowTime = moment().format('YYYY-MM-DD');

  return (
    <>
      <Container maxWidth="xl" className={classes.container}>
        <Grid
          className={classes.fullHeight}
          container
          alignItems="center"
          justifyContent="center"
          spacing={2}>
          <Grid item md={3} xs={12}>
            <div className={classes.title}>
              <Typography className={classes.h2} variant="h2" color="inherit">
                Latest Movies
              </Typography>
              <Typography className={classes.h4} variant="h4" color="inherit">
                Covering {nowTime}
              </Typography>
            </div>
          </Grid>
          <Grid item md={8} xs={12}>
            <GridList className={classes.gridList} cols={2.5}>
              {movies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </GridList>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

NewMoviesList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  movies: PropTypes.array.isRequired
};

export default withStyles(styles)(NewMoviesList);
