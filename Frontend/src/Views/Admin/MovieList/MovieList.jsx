import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import { Link } from 'react-router-dom';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { MovieToolBar, MovieCard } from './Components/Index';
import * as MovieApi from '../../../Api/MovieApi/MovieApi';
import *  as TmdbApi from '../../../Api/TmdbApi/TmdbApi';

import * as MovieAction from '../../../Store/Actions/MovieAction';
import { ResponsiveDialog } from '../../../Components/Index';
import Dashboard from '../../../Layouts/Dashboard/Dashboard';
import AddMovie from './Components/AddMovie/AddMovie';
import styles from './Styles';

const MovieList = (props) => {
  const { classes, movieInfo, ...rest } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  // const [movieList, setmovieList] = useState([]);
  const [tmdbMovieList, setTmdbMovieList] = useState(null)
  const [editMovie, setEditMovie] = useState(null);
  const dispatch = useDispatch();



  const movieList = useSelector((state) => state.movies.movies);
  const movieInfoTest = useSelector((state) => state.movies.movieInfo);

  const getTmdbMovieList = async () => {
    try {
      const response = await TmdbApi.getTmdbMovieList()
      // console.log("getTmdbMovieList response", response)
      if (response.status == 200) {
        setTmdbMovieList(response.data)
      }
    } catch (error) {
      console.log("getTmdbMovieList error", error)
    }
  }

  useEffect(() => {
    dispatch(MovieAction.getMovieList());
    getTmdbMovieList()
  }, [movieList.length]);

  const getMovieList = () => {
    dispatch(MovieAction.getMovieList());
  };

  const GetMovieInfo = (id) => {
    dispatch(MovieAction.getMovieInfo(id));
    const movieInfoTest = useSelector((state) => state.movies.movieInfo);
    return movieInfoTest;
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
      dispatch(MovieAction.getMovieInfo(movie._id));
      setEditMovie(movie);
    } else {
      handleEditDialog();
      setEditMovie(null);
    }
  };


  const handleMovieSearch = () => {

  }


  // console.log('editMovie', editMovie);
  // console.log('movieInfoTest', movieInfoTest);
  // console.log('movieInfo', movieInfo);
  if (!movieList) {
    return (
      <>
        <Dashboard title="Movie List">
          <div className={classes.root}>
            <MovieToolBar />
          </div>

          <Typography variant="h6">No movieList Data</Typography>
        </Dashboard>
      </>
    );
  } else {
    return (
      <>
        <Dashboard title="Movie List">
          <div className={classes.root}>
            <MovieToolBar tmdbMovieList={tmdbMovieList} />
          </div>
          <div className={classes.content}>
            <Grid container spacing={3}>
              {movieList.map((movie) => (
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
              <AddMovie editMovie={editMovie} tmdbMovieList={tmdbMovieList} />
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
