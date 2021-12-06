import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Rating } from '@material-ui/lab';
import {
  withStyles,
  Box,
  Typography,
  Grid,
  Container
} from '@material-ui/core';
import Navbar from '../../../Layouts/Public/Components/Navbar/Index';
import * as MovieApi from '../../../Api/MovieApi/MovieApi';
import styles from './Styles';

const MovieReservation = (props) => {
  const { classes } = props;

  //극장 좌석 샘플
  const theaterExam = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
  ];

  const [movie, setMovie] = useState('');
  const [theaterSeats, setTheaterSeats] = useState(theaterExam);

  const getMovieInfo = async () => {
    const movieId = props.match.params.id;
    try {
      const res = await MovieApi.getMovieInfo(movieId);
      const movieInfo = res.data;
      // console.log(movieInfo);
      setMovie(movieInfo);
    } catch (error) {
      console.log('getMovieInfo', error);
    }
  };

  // 극장 좌석 설정
  const handleMovieReservation = (row, seat) => {
    const selectedSeats = theaterSeats[row][seat];

    if (selectedSeats !== 1) {
      const newTheaterSeats = [...theaterSeats];
      // console.log(newTheaterSeats);
      theaterSeats[row][seat] === 2
        ? (newTheaterSeats[row][seat] = 0)
        : (newTheaterSeats[row][seat] = 2);
      setTheaterSeats(newTheaterSeats);
    }
  };

  useEffect(() => {
    getMovieInfo();
    // console.log(movie);
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Navbar />
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={2} style={{ height: '100%' }}>
            {movie && (
              <Grid item xs={12} md={12} lg={3}>
                <div className={classes.movieInfos}>
                  <div
                    className={classes.background}
                    style={{
                      backgroundImage: `url(${movie.image})`
                    }}
                  />
                  <Typography className={classes.title}>
                    {movie.title}
                  </Typography>
                  <div className={classes.info}>
                    {movie.director && (
                      <div className={classes.infoBox}>
                        <Typography variant="subtitle1" color="inherit">
                          Director
                        </Typography>
                        <Typography variant="caption" color="inherit">
                          {movie.director}
                        </Typography>
                      </div>
                    )}
                    {movie.cast && (
                      <div className={classes.infoBox}>
                        <Typography variant="subtitle1" color="inherit">
                          Cast
                        </Typography>
                        <Typography variant="caption" color="inherit">
                          {movie.cast}
                        </Typography>
                      </div>
                    )}
                    {movie.genre && (
                      <div className={classes.infoBox}>
                        <Typography variant="subtitle1" color="inherit">
                          Genre
                        </Typography>
                        <Typography variant="caption" color="inherit">
                          {movie.genre}
                        </Typography>
                      </div>
                    )}
                  </div>
                </div>
              </Grid>
            )}
            <Grid item lg={9} xs={12} md={12}>
              <Box width={1} pt={15}>
                {theaterSeats.map((seatRows, indexRow) => (
                  <div key={indexRow} className={classes.row}>
                    {seatRows.map((seat, index) => (
                      <Box
                        key={`seat-${index}`}
                        onClick={() => handleMovieReservation(indexRow, index)}
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
                  <Typography color="inherit">
                    <Box
                      mr={1}
                      display="inline-block"
                      width={10}
                      height={10}
                      bgcolor="rgb(96, 93, 169)"
                    />
                    Seat Available
                  </Typography>
                  <Typography color="inherit">
                    <Box
                      mr={1}
                      ml={2}
                      display="inline-block"
                      width={10}
                      height={10}
                      bgcolor="rgb(65, 66, 70)"
                    />
                    Reserved Seat
                  </Typography>
                  <Typography color="inherit">
                    <Box
                      mr={1}
                      ml={2}
                      display="inline-block"
                      width={10}
                      height={10}
                      bgcolor="rgb(120, 205, 4)"
                    />
                    Your Seat
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

MovieReservation.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieReservation);
