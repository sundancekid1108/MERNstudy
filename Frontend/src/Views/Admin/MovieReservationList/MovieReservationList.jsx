import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, CircularProgress, Typography } from '@material-ui/core';
import Dashboard from '../../../Layouts/Dashboard/Dashboard';
import MovieReservationListToolbar from './Components/MovieReservationListToolbar/MovieReservationListToolbar';
import MovieReservationListTable from './Components/MovieReservationListTable/MovieReservationListTable';
import MovieReservationCalendar from './Components/MovieReservationCalendar/MovieReservationCalendar';
import * as MovieReservationApi from '../../../Api/MovieReservationApi/MovieReservationApi';
import * as MovieReservationAction from '../../../Store/Actions/MovieReservationAction';
import * as MovieAction from '../../../Store/Actions/MovieAction';
import * as TheaterAction from '../../../Store/Actions/TheaterAction';

import styles from './Styles';

const MovieReservationList = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const [signal, setSignal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [movieReservationList, setMovieReservationList] = useState([]);
  const [limit, setLimit] = useState(10);

  const getMovieList = () => {
    dispatch(MovieAction.getMovieList());
  };

  const getTheaterList = () => {
    dispatch(TheaterAction.getTheaterList());
  };

  const getMovieReservationListTest = () => {
    dispatch(MovieReservationAction.getMovieRservationsList())
  }
  const getMovieReservationList = async () => {
    try {
      const data = await MovieReservationApi.getMovieReservationList();

      setMovieReservationList(data);
    } catch (error) {
      console.log('getMovieReservationList error', error);
      setErrorMessage('Check the server connection');
    }
  };

  useEffect(() => {
    setSignal(true);
    getMovieReservationList();
    getMovieReservationListTest()
    getMovieList();
    getTheaterList();
    return () => {
      setSignal(false);
    };
  }, []);

  const movieList = useSelector((state) => state.movies.movies);
  const theaterList = useSelector((state) => state.theaters.theaters);
  const movieReservationListTest = useSelector((state) => state.movieReservations.movieReservationList)
  console.log(movieList, theaterList, movieReservationListTest);

  if (isLoading) {
    return (
      <>
        <Dashboard title="Movie Reservations List">
          <div className={classes.progressWrapper}>
            <CircularProgress />
          </div>
        </Dashboard>
      </>
    );
  } else if (errorMessage) {
    return (
      <>
        <Dashboard title="Movie Reservations List">
          <Typography variant="h5">{errorMessage}</Typography>
        </Dashboard>
      </>
    );
  } else if (!movieReservationList) {
    return (
      <>
        <Dashboard title="Movie Reservations List">
          <Typography variant="h5">No Movie Reservation list </Typography>
        </Dashboard>
      </>
    );
  } else {
    return (
      <>
        <Dashboard title="Movie Reservations List">
          <div className={classes.root}>
            <MovieReservationListToolbar />
            <div className={classes.content}>
              <MovieReservationListTable
                MovieReservationList={movieReservationList}
                MovieList={movieList}
                TheaterList={theaterList}
              />
              <MovieReservationCalendar
                MovieReservationList={movieReservationList}
              />
            </div>
          </div>
        </Dashboard>
      </>
    );
  }
};

MovieReservationList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieReservationList);
