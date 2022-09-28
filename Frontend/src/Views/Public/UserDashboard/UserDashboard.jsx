import React, { useState, useEffect } from 'react';
import { Grid, Typography, Container, withStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import MyReservation from './Components/MyReservation/MyReservation';
import Account from '../../Admin/Account/Account'
import * as MovieReservationAction from '../../../Store/Actions/MovieReservationAction'
import * as MovieReservationApi from '../../../Api/MovieReservationApi/MovieReservationApi'
import styles from './Styles';

const UserDashboard = (props) => {
    const { classes } = props;
    const dispatch = useDispatch()
    const state = useSelector((state) => state.auth);
    const movieReservationList = useSelector((state) => state.movieReservations.movieReservations);
    const userMovieReservationList = useSelector((state) => state.movieReservations.userMovieReservations)
    const user = useSelector((state) => state.auth.user);
    const userId = user.userId
    // const userMovieReservationList = movieReservationList.filter((reservation) => reservation.userId._id === user.userId)

    const getMovieReservationList = () => {
        dispatch(MovieReservationAction.getMovieRservationsList())
    }

    const getUserMovieReservationList = async (value) => {
        const id = value
        dispatch(MovieReservationAction.getUserMovieReservationList(id))

        // try {
        //     const response = await MovieReservationApi.getUsermovieReservationList(id)
        //     // console.log("getUserMovieReservationList response", response)
        // } catch (error) {
        //     return error
        // }
    }


    useEffect(() => {
        //로그인했는지 체크..
        if (!state.isAuthenticated) {
            return navigate('/', { replace: false });
        }
        getMovieReservationList()
        getUserMovieReservationList(userId)
    }, [])

    const renderMyReservation = () => {
        if (userMovieReservationList) {
            return (<>
                <MyReservation userMovieReservationList={userMovieReservationList} />
            </>)
        } else {
            return (<><div>
                No Movie Reservation
            </div></>)
        }

    }

    // console.log("userMovieReservationList", userMovieReservationList)
    // console.log("userMovieReservationListTest", userMovieReservationListTest)



    return (<>
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography className={classes.title} variant="h2" color="inherit">
                        My Reservations
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {
                        renderMyReservation()
                    }

                </Grid>
                <Grid item xs={12}>
                    <Typography className={classes.title} variant="h2" color="inherit">
                        My Account
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Account />
                </Grid>
            </Grid>
        </Container>
    </>)
}


export default withStyles(styles)(UserDashboard);