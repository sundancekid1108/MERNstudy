import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import { Link } from 'react-router-dom';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { MovieToolBar, MovieCard } from './Components/Index';
import * as MovieApi from '../../../Api/MovieApi/MovieApi';

import Dashboard from '../../../Layouts/Dashboard/Index';

import styles from './Styles';
const MovieList = (props) => {
  const { classes } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  useEffect(() => {
    getMoviesList();
  }, []);

  const getMoviesList = async () => {
    setIsLoading(true);
    try {
      const res = await MovieApi.getMoviesList();
      const fetchedMoviesList = res.data;
      // console.log('fetchedMoviesList : ', fetchedMoviesList);
      setMoviesList(fetchedMoviesList);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('MoviesListError', error);
    }
  };

  // const renderMoviesList = () => {};

  if (!moviesList) {
    return (
      <>
        <Dashboard title="Movie List">
          <div className={classes.root}>
            <MovieToolBar />
          </div>

          <Typography variant="h6">No MoviesList Data</Typography>
        </Dashboard>
      </>
    );
  } else {
    return (
      <>
        <Dashboard title="Movie List">
          <div className={classes.root}>
            <MovieToolBar />
          </div>

          <Grid container spacing={3}>
            {moviesList.map((movie) => (
              <Grid item key={movie._id} lg={4} md={6} xs={12}>
                <Link to="#">
                  <MovieCard movie={movie} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Dashboard>
      </>
    );
  }
};

MovieList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieList);
