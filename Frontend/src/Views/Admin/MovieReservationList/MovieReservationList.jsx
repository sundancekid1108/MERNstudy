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
  const [searchMovieReservationResult, setSearchMovieReservationResult] = useState(null)

  const [keyword, setKeyword] = useState('');
  const [limit, setLimit] = useState(10);

  const onChange = (event) => {
    setKeyword(event.target.value)
  }

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


  const handleSearchMovieReservation = (event) => {
    const match = (term, array, key) => {
      const reg = new RegExp(term.split('').join('.*'), 'i');
      // console.log(reg)
      return array.filter(item => item[key] && item[key].match(reg));
    };

    if (event.key === "Enter") {
      console.log(keyword)
      const result = match(keyword, movieReservationList, 'username')
      setSearchMovieReservationResult(result)
      console.log(searchMovieReservationResult)
    }

    else if (event.type === 'click') {
      console.log(keyword)
      const result = match(keyword, movieReservationList, 'username')

      setSearchMovieReservationResult(result)
      console.log(searchMovieReservationResult)
    }
  }

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
  console.log('movieReservationList', movieReservationList)
  const movieReservationListTest = useSelector((state) => state.movieReservations.movieReservatinList)
  // console.log(movieList, theaterList);
  // console.log(movieReservationListTest)
  // console.log(state.movieReservations)

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
  }
  else if (searchMovieReservationResult) {
    return (
      <>
        <Dashboard title="Movie Reservations List">
          <div className={classes.root}>
            <MovieReservationListToolbar onChange={onChange} handleSearchMovieReservation={handleSearchMovieReservation} keyword={keyword} />
            <div className={classes.content}>
              <MovieReservationListTable
                MovieReservationList={searchMovieReservationResult}
                MovieList={movieList}
                TheaterList={theaterList}
              />
              {/* <MovieReservationCalendar
                MovieReservationList={movieReservationList}
              /> */}
            </div>
          </div>
        </Dashboard>
      </>
    );
  }

  else {
    return (
      <>
        <Dashboard title="Movie Reservations List">
          <div className={classes.root}>
            <MovieReservationListToolbar onChange={onChange} handleSearchMovieReservation={handleSearchMovieReservation} keyword={keyword} />
            <div className={classes.content}>
              <MovieReservationListTable
                MovieReservationList={movieReservationList}
                MovieList={movieList}
                TheaterList={theaterList}
              />
              {/* <MovieReservationCalendar
                MovieReservationList={movieReservationList}
              /> */}
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
