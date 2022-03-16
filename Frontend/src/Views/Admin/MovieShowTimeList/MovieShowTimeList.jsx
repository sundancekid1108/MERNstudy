import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, CircularProgress, Typography } from '@material-ui/core';
import { ResponsiveDialog } from '../../../Components/Index';
import Dashboard from '../../../Layouts/Dashboard/Dashboard';
import { MovieShowTimeTable, MovieShowTimeToolbar } from './Components/Index'
import * as MovieShowTimeApi from '../../../Api/MovieShowTimeApi/MovieShowTimeApi'
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
    // dispatch(MovieShowTimeAction.getMovieShowTimesList())
    const movieShowTimeListTest = useSelector((state) => state.movieShowTimes.movieShowTimes);
    // console.log("movieShowTimeListTest", movieShowTimeListTest)



    useEffect(() => {
        getMovieList();
        getTheaterList();
        getMovieShowTimeList()
        return () => {
            getMovieShowTimeList()
        }
    }, [selectedMovieShowTimes])

    const getMovieShowTimeList = async () => {
        try {
            const result = await MovieShowTimeApi.getMovieShowTimeList()

            setMovieShowTimes(result.data)
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

    const handleSelect = selectedMovieShowtimes => {
        setSelectedMovieShowTimes(selectedMovieShowtimes);
        console.log("selectedMovieShowtimes", selectedMovieShowtimes)
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
