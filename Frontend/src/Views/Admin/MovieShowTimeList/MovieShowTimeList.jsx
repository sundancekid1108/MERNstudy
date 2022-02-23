import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, CircularProgress, Typography } from '@material-ui/core';
import Dashboard from '../../../Layouts/Dashboard/Dashboard';
import { MovieShowTimeTable, MovieShowTimeToolbar } from './Components/Index'
import * as MovieShowTimeApi from '../../../Api/MovieShowTimeApi/MovieShowTimeApi'
import styles from './Styles';

const MovieShowTimeList = (props) => {
    const { className, classes } = props;
    const [movieShowTimes, setMovieShowTimes] = useState([])
    const [selectedMovieShowTimes, setSelectedMovieShowTimes] = useState([])

    useEffect(() => {
        getMovieShowTimeList()
        return () => {
            getMovieShowTimeList()
        }
    }, [selectedMovieShowTimes])

    const getMovieShowTimeList = async () => {
        console.log("getMovieShowTimeList")
        try {
            const result = await MovieShowTimeApi.getMovieShowTimeList()

            setMovieShowTimes(result.data)
            console.log("movieShowTimes", movieShowTimes)
        } catch (error) {
            console.log("getMovieShowTimeList fail")
        }
    }

    const handleDeleteMovieShowTime = async (id) => {
        try {
            const result = await MovieShowTimeApi.deleteMovieShowTime(id)
            console.log(result)
            if (result.status == 200) {
                const data = movieShowTimes.filter(
                    movieShowTime => movieShowTime._id !== id
                )

                setMovieShowTimes(data)
                setSelectedMovieShowTimes([])
            }
        } catch (error) {
            console.log("handleDeleteMovieShowTime fail")
        }
    }

    const handleSelect = selectedShowtimes => {
        setSelectedMovieShowTimes(selectedShowtimes);
    };

    const renderMovieShowTimes = () => {
        if (!movieShowTimes) {
            return <Typography variant="h6">There are no showtimes</Typography>;
        } else {
            return <MovieShowTimeTable handleSelect={handleSelect} movieShowTimes={movieShowTimes} />

        }
    }



    return <>
        <Dashboard title="Movie Showtimes">
            <div className={classes.root}>
                <MovieShowTimeToolbar
                    movieShowTimes={movieShowTimes}
                    selectedMovieShowTimes={selectedMovieShowTimes}
                    deleteMovieShowtime={handleDeleteMovieShowTime}
                />
                <div className={classes.content}>{renderMovieShowTimes()}</div>
            </div>
        </Dashboard>
    </>
}


MovieShowTimeList.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieShowTimeList);
