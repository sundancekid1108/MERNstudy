import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Button, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import styles from './Styles';

const MovieShowTimeToolbar = (props) => {
    const { classes, className, movieShowTimes, selectedMovieShowTimes, deleteMovieShowtime } = props;
    const rootClassName = classNames(classes.root, className);

    const handleDeleteMovieShowTime = (e) => {
        for (let i in selectedMovieShowTimes) {
            const pickedId = selectedMovieShowTimes[i];
            deleteMovieShowtime(pickedId)
        }

    };

    return <>
        <div className={rootClassName}>
            <div className={classes.row}>
                <div>
                    {selectedMovieShowTimes.length > 0 && (
                        <IconButton
                            className={classes.deleteButton}
                            onClick={handleDeleteMovieShowTime}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                    <Button color="primary" size="small" variant="outlined">
                        Add
                    </Button>
                </div>
            </div>
        </div>
    </>
}

MovieShowTimeToolbar.defaultProps = {
    selectedMovieShowTimes: []
};

MovieShowTimeToolbar.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    selectedMovieShowTimes: PropTypes.array
};


export default withStyles(styles)(MovieShowTimeToolbar);