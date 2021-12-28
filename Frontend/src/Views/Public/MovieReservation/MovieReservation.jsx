import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Rating } from '@material-ui/lab';
import {
  withStyles,
  Box,
  Button,
  Typography,
  Grid,
  Container
} from '@material-ui/core';
import Navbar from '../../../Layouts/Public/Components/Navbar/Navbar';
import moment from 'moment';
import * as MovieApi from '../../../Api/MovieApi/MovieApi';
import * as TheaterApi from '../../../Api/TheaterApi/TheaterApi';
import * as MovieReservationApi from '../../../Api/MovieReservationApi/MovieReservationApi';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Styles';

const MovieReservation = (props) => {
  const { classes } = props;
  const userData = useSelector((state) => state.auth.user); // 유저정보 Redux
  // console.log('movereservation user', user);
  const [userInfo, setUserInfo] = useState(userData);
  const [movie, setMovie] = useState('');
  const [theater, setTheater] = useState(null);
  const [theaterSeats, setTheaterSeats] = useState([]);
  const [selectedSeatsList, setSelectedSeatsList] = useState([]);

  const [ticketPrice, setTicketPrice] = useState(10000);
  const [seatsAvailable, setSeatsAvailable] = useState(100);

  const theater_Id = '61b46fd35771338642f248e4';
  const history = useHistory();
  const nowTime = moment().format('YYYY-MM-DD');

  //유저정보
  const getUserInfo = () => {
    setUserInfo(userData);
  };

  //영화정보
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
  // 초기 극장 전체 좌석 정보 나중에 극장 아이디 받어오는것도 처리해야됨..
  const getTheaterInfo = async () => {
    try {
      const res = await TheaterApi.getTheaterInfo(theater_Id);
      // console.log(res);
      const theaterSeatsData = res.data.seats;
      // console.log(theaterSeatsData);
      setTheaterSeats(theaterSeatsData);
      setTheater(res.data);
      // console.log('getTheaterInfo', res);
    } catch (error) {
      console.log('getTheaterInfo', error);
    }
  };

  //좌석 선택, 선택 좌석 개수 세기,  선택좌석 정보 저장
  const handleUserSelectSeats = (row, seat) => {
    //0 => 빈자리, 1=> 예매완료, 2=> 내가 선택
    const selectedSeats = theaterSeats[row][seat];
    const seatData = [row, seat];
    if (selectedSeats !== 1) {
      const newTheaterSeats = [...theaterSeats];

      // console.log(newTheaterSeats);
      theaterSeats[row][seat] === 2
        ? (newTheaterSeats[row][seat] = 0)
        : (newTheaterSeats[row][seat] = 2);

      if (newTheaterSeats[row][seat] === 2) {
        selectedSeatsList.push(seatData);
        setSelectedSeatsList(selectedSeatsList);
      } else {
        const newSelectedSeatsList = selectedSeatsList.filter(
          (i) => JSON.stringify(i) !== JSON.stringify(seatData)
        );
        setSelectedSeatsList(newSelectedSeatsList);
      }
      setTheaterSeats(newTheaterSeats);
    }
  };

  //영화 예매 함수
  const makeReservation = async () => {
    const startAt = nowTime;
    const seats = selectedSeatsList;
    const ticketPrice = theater.ticketPrice;
    const totalPrice = selectedSeatsList.length * ticketPrice;
    const movieId = movie._id;
    const theaterId = theater._id;

    try {
      const res = await MovieReservationApi.createMovieReservation(
        startAt,
        seats,
        ticketPrice,
        totalPrice,
        movieId,
        theaterId
      );
      console.log(res);
    } catch (error) {
      console.log('makeReservationError ', error);
    }
  };

  // 예매 후 예매 된 자리 매진 처리하는 극장 자리 정보 업데이트
  const updateTheaterSeatsData = async () => {
    const seats = theaterSeats.map((row) =>
      row.map((seat) => ([1, 2].includes(seat) ? 1 : 0))
    );
    const theaterId = theater._id;
    const seatsAvailable = theater.seatsAvailable - selectedSeatsList.length;
    try {
      const res = await TheaterApi.updateTheaterSeatsInfo(
        theaterId,
        seats,
        seatsAvailable
      );
      console.log(res);
    } catch (error) {
      console.log('updateTheaterSeatsData error ', error);
    }
  };

  // 극장 좌석 설정  Test
  const handleMovieReservation = () => {
    if (!userInfo) {
      history.push('/signin');
    } else if (selectedSeatsList.length == 0) {
      console.log('choose seats first');
    } else {
      // console.log('handleMovieReservation');
      makeReservation();
      updateTheaterSeatsData();
    }
  };

  useEffect(() => {
    getUserInfo();
    getMovieInfo();
    getTheaterInfo();
    return () => {};
  }, []);

  // console.log('movie', movie);
  // console.log('theater', theater);
  console.log('selectedSeatsList', selectedSeatsList);
  // console.log('selectedSeatsList.lengh', selectedSeatsList.length);
  // console.log('userinfo ', userInfo);

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
                {theaterSeats.length > 0 &&
                  theaterSeats.map((seatRows, indexRow) => (
                    <div key={indexRow} className={classes.row}>
                      {seatRows.map((seat, index) => (
                        <Box
                          key={`seat-${index}`}
                          onClick={() => handleUserSelectSeats(indexRow, index)}
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
              <Box marginTop={2} bgcolor="rgb(18, 20, 24)">
                <Grid container>
                  <Grid item xs={10}>
                    <Grid container spacing={3} style={{ padding: 20 }}>
                      <Grid item>
                        <Typography className={classes.bannerTitle}>
                          Name
                        </Typography>
                        {}
                        <Typography className={classes.bannerContent}>
                          {userInfo ? userInfo.userName : ''}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography className={classes.bannerTitle}>
                          Tickets
                        </Typography>
                        {selectedSeatsList.length > 0 ? (
                          <Typography className={classes.bannerContent}>
                            {selectedSeatsList.length} tickets
                          </Typography>
                        ) : (
                          <Typography className={classes.bannerContent}>
                            None
                          </Typography>
                        )}
                      </Grid>
                      <Grid item>
                        <Typography className={classes.bannerTitle}>
                          Price
                        </Typography>
                        <Typography className={classes.bannerContent}>
                          {ticketPrice * selectedSeatsList.length} $
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{
                      color: 'rgb(120, 205, 4)',
                      background: 'black',
                      display: 'flex'
                    }}>
                    <Button
                      color="inherit"
                      fullWidth
                      disabled={seatsAvailable <= 0}
                      onClick={() => handleMovieReservation()}>
                      Checkout
                    </Button>
                  </Grid>
                </Grid>
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
