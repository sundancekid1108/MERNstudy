import React, { useState, useEffect } from 'react';
import { withStyles, Box, Grid, Typography } from '@material-ui/core';
import styles from './Styles';

const RenderTheaterSeats = (props) => {
    const { classes, selectedTheater, selectedMovieShowTime, handleUserSelectSeats } = props;

    // console.log('selectedTheater', selectedTheater)
    // console.log("selectedMovieShowTime", selectedMovieShowTime)

    const renderSelectTheaterSeats = () => {
        if (selectedTheater && selectedMovieShowTime) {
            return <>
                <Box width={1} pt={15}>

                    {selectedTheater.seats.map((seatRows, indexRow) => (
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
                    <Box
                        width="50%"
                        margin="auto"
                        display="flex"
                        alignItems="center"
                        textAlign="center"
                        color="#eee">
                        <div>
                            <Box
                                mr={1}
                                display="inline-block"
                                width={10}
                                height={10}
                                bgcolor="rgb(96, 93, 169)"
                            />
                            Seat Available
                        </div>
                        <div>
                            <Box
                                mr={1}
                                ml={2}
                                display="inline-block"
                                width={10}
                                height={10}
                                bgcolor="rgb(65, 66, 70)"
                            />
                            Reserved Seat
                        </div>
                        <div>
                            <Box
                                mr={1}
                                ml={2}
                                display="inline-block"
                                width={10}
                                height={10}
                                bgcolor="rgb(120, 205, 4)"
                            />
                            Your Seat
                        </div>
                    </Box>
                </Box>
            </>
        }

    }
    return <>
        {renderSelectTheaterSeats()}</>

}

export default withStyles(styles)(RenderTheaterSeats);