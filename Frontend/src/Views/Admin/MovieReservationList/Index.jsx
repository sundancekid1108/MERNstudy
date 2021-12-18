import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles, CircularProgress, Typography } from '@material-ui/core';
import Dashboard from '../../../Layouts/Dashboard/Index';
import MovieReservationListToolbar from './Components/MovieReservationListToolbar/Index';
import MovieReservationListTable from './Components/MovieReservationListTable/Index';
import * as MovieReservationApi from '../../../Api/MovieReservationApi/MovieReservationApi';
import styles from './Styles';

const MovieReservationList = (props) => {
  const { classes } = props;
  const [signal, setSignal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [movieReservationList, setMovieReservationList] = useState([]);
  const [limit, setLimit] = useState(10);

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
    return () => {
      setSignal(false);
    };
  }, []);

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
  } else if (movieReservationList.length == 0) {
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
