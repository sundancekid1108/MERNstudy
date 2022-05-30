import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import { Button, TextField, MenuItem } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import * as MovieShowTimeApi from '../../../../../Api/MovieShowTimeApi/MovieShowTimeApi'
import * as MovieShowTimeAction from '../../../../../Store/Actions/MovieShowTimeAction'
import styles from './Styles';

const AddMovieShowTime = (props) => {
    const {
        selectedMovieShowtime,
        classes,
        className,
        ...rest
    } = props;

    console.log("selectedMovieShowtime", selectedMovieShowtime)
    const [movieId, setMovieId] = useState('')
    const [theaterId, setTheaterId] = useState('')
    const [startAt, setStartAt] = useState(new Date())
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isImax, setIsImax] = useState(false)
    const [is3d, setIs3d] = useState(false)
    const dispatch = useDispatch();

    const movieList = useSelector((state) => state.movies.movies);
    const nowShowingMovieList = useSelector((state) => state.movies.nowShowing);
    const theaterList = useSelector((state) => state.theaters.theaters);

    const rootClassName = classNames(classes.root, className);


    const prevMovieShowTime = selectedMovieShowtime[0]

    //이전 데이터들이 있을땐 이전 데이터 입력
    useEffect(() => {
        if (prevMovieShowTime) {
            setMovieId(movieList.filter(x => x._id == prevMovieShowTime.movieId)[0]._id)
            setTheaterId(theaterList.filter(x => x._id == prevMovieShowTime.theaterId)[0]._id)
            setStartAt(prevMovieShowTime.startAt)
            setStartDate(prevMovieShowTime.startDate)
            setEndDate(prevMovieShowTime.endDate)
            setIsImax(prevMovieShowTime.isImax)
            setIs3d(prevMovieShowTime.is3d)
        }
    }, [])


    const handleAddMovieShowTime = async () => {
        if (

            movieId !== '' ||
            theaterId !== '' ||
            isImax !== '' ||
            is3d !== '' ||
            startAt !== '' ||
            startDate !== '' ||
            endDate !== ''

        ) {
            const body = {
                movieId,
                theaterId,
                isImax,
                is3d,
                startAt,
                startDate,
                endDate
            }
            try {
                const response = await dispatch(MovieShowTimeAction.createMovieShowTime(body))
                return response
            } catch (error) {
                console.log("handleAddMovieShowTime Error", error)
            }
        } else {
            console.log("handleAddMovieShowTime Fail")
        }


    }

    const handleUpdateMovieShowTime = async () => {
        // console.log("handleUpdateMovieShowTime")
        if (
            movieId !== '' ||
            theaterId !== '' ||
            isImax !== '' ||
            is3d !== '' ||
            startAt !== '' ||
            startDate !== '' ||
            endDate !== ''

        ) {
            const id = prevMovieShowTime._id
            const body = {
                movieId,
                theaterId,
                isImax,
                is3d,
                startAt,
                startDate,
                endDate
            }
            try {
                const response = await dispatch(MovieShowTimeAction.updateMovieShowTime(id, body))
                return response

            } catch (error) {
                console.log("handleUpdateMovieShowTime Fail", error)
            }
        } else {
            console.log("handleAddMovieShowTime Fail")
        }
    }


    const getMinDate = () => {
        const id = prevMovieShowTime.movieId
        const movie_data = nowShowingMovieList.find(movieShowTime => movieShowTime._id === id);
        console.log("movie_data", movie_data)
        if (movie_data) {
            return new Date(movie_data.releaseDate)
        } else {
            return new Date()
        }

    }

    const getMaxDate = () => {
        const id = prevMovieShowTime.movieId
        console.log("id", id)
        const movie_data = nowShowingMovieList.find(movieShowTime => movieShowTime._id === id);
        console.log("movie_data", movie_data)
        if (movie_data) {
            return new Date(movie_data.endDate)
        } else {
            return new Date()
        }
    }


    const title = prevMovieShowTime
        ? 'Edit Showtime'
        : 'Add Showtime';
    const submitButton = prevMovieShowTime
        ? 'Update Showtime'
        : 'Save Details';
    const submitAction = prevMovieShowTime
        ? () => handleUpdateMovieShowTime()
        : () => handleAddMovieShowTime();

    console.log("nowShowingMovieList", nowShowingMovieList)

    return <>
        <div className={rootClassName} {...rest}>
            <Typography variant="h4" className={classes.title}>
                {title}
            </Typography>
            <form autoComplete="off" noValidate>
                <div className={classes.field}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardTimePicker
                            autoOk
                            className={classes.textField}
                            margin="normal"
                            label="Time"
                            value={startAt}
                            variant="inline"
                            onChange={data =>
                                setStartAt(data)
                            }
                            inputVariant="outlined"


                        />
                    </MuiPickersUtilsProvider>

                </div>
                <div className={classes.field}>
                    <TextField
                        fullWidth
                        select
                        className={classes.textField}
                        label="Movie"
                        margin="dense"
                        required
                        value={movieId}
                        variant="outlined"
                        onChange={event =>
                            setMovieId(event.target.value)
                        }

                    >
                        {movieList.map(movie => (
                            <MenuItem key={movie._id} value={movie._id}>
                                {movie.title}
                            </MenuItem>
                        ))}

                    </TextField>

                    <TextField
                        fullWidth
                        select
                        className={classes.textField}
                        label="theater"
                        margin="dense"
                        required
                        value={theaterId}
                        variant="outlined"
                        onChange={(event) => setTheaterId(event.target.value)
                        }>
                        {theaterList.map(theater => (
                            <MenuItem key={theater._id} value={theater._id}>
                                {theater.theaterName}
                            </MenuItem>
                        ))}
                    </TextField>


                </div>

                <div className={classes.field}>
                    <TextField
                        fullWidth
                        select
                        className={classes.textField}

                        label="IMAX"
                        margin="dense"
                        required
                        value={isImax}
                        variant="outlined"
                        onChange={event =>
                            setIsImax(event.target.value)
                        }>
                        {['true', 'false'].map(
                            value => (
                                <MenuItem key={value} value={value}>
                                    {value}
                                </MenuItem>
                            )
                        )}
                    </TextField>
                    <TextField
                        fullWidth
                        select
                        className={classes.textField}

                        label="3D"
                        margin="dense"
                        required
                        value={is3d}
                        variant="outlined"
                        onChange={event =>
                            setIs3d(event.target.value)
                        }>
                        {['true', 'false'].map(
                            value => (
                                <MenuItem key={value} value={value}>
                                    {value}
                                </MenuItem>
                            )
                        )}
                    </TextField>
                </div>

                <div className={classes.field}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                            autoOk
                            className={classes.textField}
                            margin="normal"
                            id="start-date"
                            label="Start Date"
                            format="YYYY-MM-DD"
                            views={['year', 'month', 'date']}
                            minDate={getMinDate()}
                            maxDate={getMaxDate()}
                            value={startDate}
                            variant="inline"
                            onChange={(data) => setStartDate(data)}
                            inputVariant="outlined"

                            KeyboardButtonProps={{
                                'aria-label': 'change date'
                            }}
                        />

                        <KeyboardDatePicker
                            className={classes.textField}
                            inputVariant="outlined"
                            margin="normal"
                            id="end-date"
                            label="End Date"
                            format="YYYY-MM-DD"
                            views={['year', 'month', 'date']}
                            minDate={getMinDate()}
                            maxDate={getMaxDate()}
                            value={endDate}
                            onChange={(data) => setEndDate(data)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date'
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
            </form>

            <Button
                className={classes.buttonFooter}
                color="primary"
                variant="contained"
                onClick={submitAction}>
                {submitButton}
            </Button>
        </div>
    </>
}

AddMovieShowTime.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
};


export default withStyles(styles)(AddMovieShowTime);