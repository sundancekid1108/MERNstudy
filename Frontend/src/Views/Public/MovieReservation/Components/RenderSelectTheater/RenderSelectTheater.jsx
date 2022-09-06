import React from 'react';
import { Grid, Box, TextField, MenuItem, Typography, withStyles, Select } from '@material-ui/core';
import moment from 'moment';
import styles from '../../Styles';

const RenderSelectTheater = (props) => {
  const { classes, selectedTheater, handleSelectedTheater, handleSelectedMovieShowTime, handleSelectedFilteredMovieShowTime, selectedMovieShowTime, movieShowTimeList } = props;
  const theatersList = movieShowTimeList.map(theater => theater.theaterId)
  const filteredTheatersList = theatersList.filter((arr, index, callback) => index === callback.findIndex(t => t._id === arr._id))



  const filteredMovieShowTimeList = movieShowTimeList
    .filter((movieShowTime) =>
      selectedTheater ? selectedTheater._id === movieShowTime.theaterId._id : true
    )
    .map((movieShowTime) => movieShowTime)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort(
      (a, b) => new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b)
    );


  if (filteredTheatersList.length > 0) {
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              select
              value={selectedTheater}
              label="Select Theater"
              variant="outlined"
              onChange={handleSelectedTheater}>
              {filteredTheatersList.map((theater) => (
                <MenuItem key={theater._id} value={theater}>
                  {theater.theaterName}
                </MenuItem>
              ))}

            </TextField>
          </Grid>
          {selectedTheater && (
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                value={selectedMovieShowTime}
                label="Select Time"
                variant="outlined"
                onChange={handleSelectedMovieShowTime
                }>
                {filteredMovieShowTimeList.map((movieShowTime) => (
                  <MenuItem
                    key={movieShowTime._id}
                    value={movieShowTime}>
                    {moment(movieShowTime.startAt).format('YYYY-MM-DD HH:mm')}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
        </Grid>
      </>)
  } else {
    return (<>
      <Box
        display="flex"
        width={1}
        height={1}
        alignItems="center"
        justifyContent="center">
        <Typography align="center" variant="h2" color="inherit">
          No Theater List.
        </Typography>
      </Box>
    </>
    )
  }
}

export default withStyles(styles)(RenderSelectTheater);