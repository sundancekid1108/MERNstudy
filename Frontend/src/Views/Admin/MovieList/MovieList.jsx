import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import { Link } from 'react-router-dom';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { MovieToolBar, MovieCard } from './Components/Index';
import * as MovieApi from '../../../Api/MovieApi/MovieApi';
import { ResponsiveDialog } from '../../../Components/Index';
import Dashboard from '../../../Layouts/Dashboard/Dashboard';
import AddMovie from './Components/AddMovie/AddMovie';
import styles from './Styles';

const MovieList = (props) => {
  const { classes, ...rest } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [moviesList, setMoviesList] = useState([]);
  const [editMovie, setEditMovie] = useState(null);

  useEffect(() => {
    getMoviesList();
  }, [moviesList.data]);

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

  const handleEditDialog = (e) => {
    if (editDialog == false) {
      setEditDialog(true);
    } else {
      setEditDialog(false);
    }
  };

  // 무비리스트에서 수정하고자 하는 movie data를 어떻게 넘겼는지가 중요!
  const handleEditMovieInfo = (movie) => {
    // console.log('handleEditMovieInfo', movie);
    if (editDialog == false) {
      handleEditDialog();
      // setEditDialog(true);
      setEditMovie(movie);
    } else {
      handleEditDialog();
      setEditMovie(null);
    }
  };

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
          <div className={classes.content}>
            <Grid container spacing={3}>
              {moviesList.map((movie) => (
                <Grid
                  item
                  key={movie._id}
                  lg={4}
                  md={6}
                  xs={12}
                  onClick={() => handleEditMovieInfo(movie)}>
                  <MovieCard movie={movie} />
                </Grid>
              ))}
            </Grid>
            <ResponsiveDialog
              id="Edit-movie"
              open={editDialog}
              handleClose={handleEditDialog}>
              <AddMovie editmovie={editMovie} />
            </ResponsiveDialog>
          </div>
        </Dashboard>
      </>
    );
  }
};

MovieList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieList);
