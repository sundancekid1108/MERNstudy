import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Button, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import AddMovieShowTime from '../AddMovieShowTime/AddMovieShowTime'
import { SearchInput, ResponsiveDialog } from '../../../../../Components/Index';
import styles from './Styles';

const MovieShowTimeToolbar = (props) => {
    const { classes, className, movieShowTimes, selectedMovieShowTimes, deleteMovieShowtime } = props;
    const rootClassName = classNames(classes.root, className);
    const [isOpenAddDialog, setIsOpenAddDialog] = useState(false);
    const [editMovieShowTime, setEditMovieShowTime] = useState(null)

    const handleDeleteMovieShowTime = (e) => {
        for (let i in selectedMovieShowTimes) {
            const pickedId = selectedMovieShowTimes[i]._id;
            deleteMovieShowtime(pickedId)
        }

    };

    //popup dialog 열고 닫기
    const handleCreateDialog = () => {
        if (isOpenAddDialog === false) {
            setIsOpenAddDialog(true);
        } else {
            setIsOpenAddDialog(false);
        }
    };

    const handleEditMovieShowTime = (movieShowTime) => {
        console.log("handleEditMovieShowTime")
        if (isOpenAddDialog === false) {
            setIsOpenAddDialog(true);
        } else {
            setIsOpenAddDialog(false);

        }
    }

    const handleCreateMovieShowTime = (e) => {
        console.log("handleCreateMovieShowTime")
        setEditMovieShowTime(null)
        if (isOpenAddDialog === false) {
            setIsOpenAddDialog(true);
        } else {
            setIsOpenAddDialog(false);
        }
    }

    const renderButton = () => {
        if (selectedMovieShowTimes.length === 1) {
            return <Button color="primary" size="small" variant="outlined"
                onClick={() => handleEditMovieShowTime(selectedMovieShowTimes)}> Edit</Button>
        } else if (selectedMovieShowTimes.length > 1) {
            return null
        } else {
            return <Button color="primary" size="small" variant="outlined"
                onClick={handleCreateMovieShowTime}> Add </Button>
        }
    }

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


                    {renderButton()}


                    <ResponsiveDialog
                        id="Add_MovieShowTime"
                        open={isOpenAddDialog}
                        handleClose={handleCreateDialog}

                    >
                        <AddMovieShowTime selectedMovieShowtime={selectedMovieShowTimes} handleClose={handleCreateDialog} />
                    </ResponsiveDialog>
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