import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, CircularProgress, Typography } from '@material-ui/core';
import { ResponsiveDialog } from '../../../Components/Index';
import Dashboard from '../../../Layouts/Dashboard/Dashboard';
import { MovieShowTimeTable, MovieShowTimeToolbar } from './Components/Index'
import * as MovieAction from '../../../Store/Actions/MovieAction';
import * as TheaterAction from '../../../Store/Actions/TheaterAction';
import * as MovieShowTimeAction from '../../../Store/Actions/MovieShowTimeAction'
import styles from './Styles';

const MovieShowTimeList = (props) => {
    const { className, classes } = props;
    const [movieShowTimes, setMovieShowTimes] = useState([])
    const [selectedMovieShowTimes, setSelectedMovieShowTimes] = useState([])
    const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);

    const dispatch = useDispatch();
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




    useEffect(() => {
        getMovieList();
        getTheaterList();
        getMovieShowTimeList()
        return () => {
            getMovieShowTimeList()
        }
    }, [])


    const movieShowTimeList = useSelector((state) => state.movieShowTimes.movieShowTimes);
    // console.log("movieShowTimeList", movieShowTimeList)

    const handleDeleteMovieShowTime = async (id) => {
        try {
            const result = await dispatch(MovieShowTimeAction.deleteMovieShowTime(id))
            console.log(result)

        } catch (error) {
            console.log("handleDeleteMovieShowTime fail")
        }
    }

    const handleSelect = selectedMovieShowtimes => {
        setSelectedMovieShowTimes(selectedMovieShowtimes);
    };

    const renderMovieShowTimes = () => {
        if (!movieShowTimes) {
            return <Typography variant="h6">There are no showtimes</Typography>;
        } else {
            return <MovieShowTimeTable handleSelect={handleSelect} movieShowTimes={movieShowTimeList} />

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
