import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, withStyles } from '@material-ui/core';
import Dashboard from '../../../Layouts/Dashboard/Dashboard';
import styles from './Styles';
import LatestSalesPage from './Components/LatestSalesPage/LatestSalesPage'
import TotalMoviePage from './Components/TotalMoviePage/TotalMoviePage';
import TotalProfitPage from './Components/TotalProfitPage/TotalProfitPage';
import TotalUserPage from './Components/TotalUserPage/TotalUserPage'
import TotalTheaterPage from './Components/TotalTheaterPage/TotalTheaterPage';
import TotalMovieReservationPage from './Components/TotalMovieReservationPage/TotalMovieReservationPage';
import * as UserAction from '../../../Store/Actions/UserAction'
import * as MovieAction from '../../../Store/Actions/MovieAction';
import * as TheaterAction from '../../../Store/Actions/TheaterAction';
import * as MovieShowTimeAction from '../../../Store/Actions/MovieShowTimeAction'
import * as MovieReservationAction from '../../../Store/Actions/MovieReservationAction'

const DashboardPage = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();

  const getUserList = () => {
    dispatch(UserAction.getUserList())
  }

  const getMovieList = () => {
    dispatch(MovieAction.getMovieList());
  };

  const getTheaterList = () => {
    dispatch(TheaterAction.getTheaterList());
  };

  const getMovieShowTimeList = () => {
    dispatch(MovieShowTimeAction.getMovieShowTimesList())
    // setMovieShowTimes(movieShowTimeList)
  }

  const getMovieReservationList = () => {
    dispatch(MovieReservationAction.getMovieRservationsList())
  }



  const userList = useSelector((state) => state.users.users);
  const movieList = useSelector((state) => state.movies.movies);
  const theaterList = useSelector((state) => state.theaters.theaters);
  const movieShowTimeList = useSelector((state) => state.movieShowTimes.movieShowTimes);
  const movieReservationsList = useSelector((state) => state.movieReservations.movieReservations)
  useEffect(() => {
    getUserList()
    getMovieList();
    getTheaterList();
    getMovieShowTimeList()
    getMovieReservationList()
    return () => {

    }
  }, [])

  return (
    <>

      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalUserPage userList={userList} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalTheaterPage theaterList={theaterList} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalMoviePage movieList={movieList} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalMovieReservationPage movieReservationsList={movieReservationsList} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            {/* <LatestSalesPage /> 
                추후 작업예정
              */}
          </Grid>

        </Grid>
      </div>

    </>
  );
};

export default withStyles(styles)(DashboardPage);
