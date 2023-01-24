import React, { useState, useEffect } from 'react';
import { withStyles, Box, Grid, Typography } from '@material-ui/core';
import styles from './Styles';

const RenderTheaterSeats = (props) => {
    const { classes, selectedTheater, selectedMovieShowTime, handleUserSelectSeats, movieShowTimeList, filteredMovieShowTime } = props;

    // console.log("movieShowTimeList", movieShowTimeList)
    // console.log('selectedTheater', selectedTheater)
    // console.log("selectedMovieShowTime", selectedMovieShowTime)
    // console.log("filteredMovieShowTime", filteredMovieShowTime)
    // console.log("filteredMovieShowTime", filteredMovieShowTime[0].seats)

    const renderSelectTheaterSeats = () => {
        if (selectedTheater && selectedMovieShowTime) {

            return <>
                <Box width={1} pt={15}>

                    {selectedMovieShowTime.seats.map((seatRows, indexRow) => (
                        <div key={indexRow} className={classes.row}>
                            {seatRows.map((seat, index) => (
                                <Box
                                    key={`seat-${index}`}
                                    onClick={() =>
                                        handleUserSelectSeats(indexRow, index)
                                    }
                                    className={classes.seat}
                                    bgcolor={
                                        seat === 1
                                            ? 'rgb(65, 66, 70)'
                                            : seat === 2
                                                ? 'rgb(120, 205, 4)'
                                                : 'rgb(96, 93, 169)'
                                    }>
                                    {index + 1}
                                </Box>
                            ))}
                        </div>
                    ))}
                </Box>
                <Box width={1} mt={10}>
                    <div className={classes.seatInfoContainer}>
                        <div className={classes.seatInfo}>
                            <div
                                className={classes.seatInfoLabel}
                                style={{ background: 'rgb(96, 93, 169)' }}></div>
                            Seat Available
                        </div>
                        <div className={classes.seatInfo}>
                            <div
                                className={classes.seatInfoLabel}
                                style={{ background: 'rgb(65, 66, 70)' }}></div>
                            Reserved Seat
                        </div>
                        <div className={classes.seatInfo}>
                            <div
                                className={classes.seatInfoLabel}
                                style={{ background: 'rgb(120, 205, 4)' }}></div>
                            Selected Seat
                        </div>
                        <div className={classes.seatInfo}>
                            <div
                                className={classes.seatInfoLabel}
                                style={{ background: 'rgb(14, 151, 218)' }}></div>
                            Recommended Seat
                        </div>
                    </div>
                    
                </Box>
            </>
        }

    }
    return <>
        {renderSelectTheaterSeats()}
    </>

}

export default withStyles(styles)(RenderTheaterSeats);