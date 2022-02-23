import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import { Button, TextField, MenuItem } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import styles from './Styles';

const AddMovieShowTime = (props) => {
    const [movieId, setMovieId] = useState('')
    const [theaterId, setTheaterId] = useState('')
    const [startAt, setStartAt] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [isImax, setIsImax] = useState(false)
    const [is3d, setIs3d] = useState(false)

    const rootClassName = classNames(classes.root, className);

    const handleAddMovieShowTime = () => {
        console.log("handleAddMovieShowTime")
    }

    const handleUpdateMovieShowTime = () => {
        console.log("handleUpdateMovieShowTime")
    }


    const title = selectedMovieShowtime
        ? 'Edit Showtime'
        : 'Add Showtime';
    const submitButton = selectedMovieShowtime
        ? 'Update Showtime'
        : 'Save Details';
    const submitAction = selectedMovieShowtime
        ? () => handleUpdateMovieShowTime()
        : () => handleAddMovieShowTime();

    const {
        movieShowTimes,
        selectedMovieShowtime,
        classes,
        className,
        ...rest
    } = props;

    return <>
        <div className={rootClassName} {...rest}>
            <Typography variant="h4" className={classes.title}>
                {title}
            </Typography>
            <form autoComplete="off" noValidate>
                <div className={classes.field}>
                    <TextField
                        fullWidth
                        select
                        className={classes.textField}
                        helperText="Please specify the Time"
                        label="Time"
                        margin="dense"
                        required
                        value={startAt}
                        variant="outlined"
                        onChange={event =>
                            setStartAt(event.target.value)
                        }>
                        {['18:00', '19:00', '20:00', '21:00', ' 22:00', '23:00'].map(
                            time => (
                                <MenuItem key={`time-${time}`} value={time}>
                                    {time}
                                </MenuItem>
                            )
                        )}
                    </TextField>
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
                        }>
                        {movies.map(movie => (
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
                        {theaters.map(theater => (
                            <MenuItem key={theater._id} value={theater._id}>
                                {theater.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>

                <div className={classes.field}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                            className={classes.textField}
                            inputVariant="outlined"
                            margin="normal"
                            id="start-date"
                            label="Start Date"
                            value={startDate}
                            onChange={date => this.handleFieldChange('startDate', date._d)}
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
                            value={endDate}
                            onChange={date => this.handleFieldChange('endDate', date._d)}
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