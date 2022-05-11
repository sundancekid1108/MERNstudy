import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Rating } from '@material-ui/lab';
import {
  withStyles,
  Box,
  Typography,
  Grid,
  Container,
  Button,
  TextField,
  MenuItem
} from '@material-ui/core';
import Navbar from '../../../Layouts/Public/Components/Navbar/Navbar';
import moment from 'moment';

import * as MovieApi from '../../../Api/MovieApi/MovieApi';
import * as TheaterApi from '../../../Api/TheaterApi/TheaterApi';
import * as MovieShowTimeApi from '../../../Api/MovieShowTimeApi/MovieShowTimeApi';
import * as MovieReservationApi from '../../../Api/MovieReservationApi/MovieReservationApi';

import * as MovieAction from '../../../Store/Actions/MovieAction'
import * as TheaterAction from '../../../Store/Actions/TheaterAction';
import * as MovieShowTimeAction from '../../../Store/Actions/MovieShowTimeAction'
import * as MovieReservationAction from '../../../Store/Actions/MovieReservationAction';
import { useDispatch, useSelector } from 'react-redux';

import ResponsiveDialog from '../../../Components/ResponsiveDialog/ResponsiveDialog'
import SignInForm from '../../Admin/SignIn/Components/SignInForm/SignInForm'

import styles from './Styles';

const MovieReservation = (props) => {
  const { classes } = props;
  const history = useHistory();
  const movieId = props.match.params.id;
  const nowTime = moment().format('YYYY-MM-DD');
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.user); // 유저정보 Redux
  const theatersList = useSelector((state) => state.theaters.theaters);
  const movieShowTimeList = useSelector((state) => state.movieShowTimes.movieShowTimes);
  const movieShowTimeListTest = movieShowTimeList.filter(i => i.movieId == movieId)
  const filtertheaterIdTest = movieShowTimeListTest.map(i => i.theaterId).filter((value, index, self) => self.indexOf(value) === index)
  const [movie, setMovie] = useState('');
  const [theater, setTheater] = useState('');
  const [theaterSeats, setTheaterSeats] = useState([]);
  const [selectedSeatsList, setSelectedSeatsList] = useState([]);
  const [selectedTheater, setSelectedTheater] = useState('');
  const [selectedMovieShowTime, setSelectedMovieShowTime] = useState('');
  const [seatsAvailable, setSeatsAvailable] = useState('');



  const [mustLogin, setMustLogin] = useState(false)


  const [isOpenDialog, setIsOpenDialog] = useState(false);
  //popup dialog 열고 닫기
  const handleDialog = () => {
    if (isOpenDialog == false) {
      setIsOpenDialog(true);
    } else {
      setIsOpenDialog(false);
    }
  };



  //영화정보
  const getMovieInfo = async () => {
    try {
      const res = await MovieApi.getMovieInfo(movieId);
      const movieInfo = res.data;
      setMovie(movieInfo);
    } catch (error) {
      console.log('getMovieInfo', error);
    }
  };

  //극장 리스트
  const getTheaterList = () => {
    dispatch(TheaterAction.getTheaterList());
  };

  //극장별 영화 상영시간
  const getMovieShowTimeList = async () => {
    dispatch(MovieShowTimeAction.getMovieShowTimesList());

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
  const createMovieReservation = async () => {
    const startAt = selectedMovieShowTime.startAt;
    const seats = selectedSeatsList;
    const ticketPrice = selectedTheater.ticketPrice;
    const totalPrice = selectedSeatsList.length * ticketPrice;
    const movieId = movie._id;
    const theaterId = selectedTheater._id;

    const body = {
      startAt,
      seats,
      ticketPrice,
      totalPrice,
      movieId,
      theaterId
    };

    try {
      const res = await MovieReservationApi.createMovieReservation(
        body
      );
      console.log(res);
    } catch (error) {
      console.log('createMovieReservationError ', error);
    }
  };

  // 예매 후 예매 된 자리 매진 처리하는 극장 자리 정보 업데이트
  const updateTheaterSeatsData = async () => {
    const seats = theaterSeats.map((row) =>
      row.map((seat) => ([1, 2].includes(seat) ? 1 : 0))
    );

    // const newSeats = theaterSeats.map((row) =>
    //   row.map((seat) => ([1, 2].includes(seat) ? 1 : 0))
    // );

    // const totalBookedSeats = seats
    //   .reduce((a, b) => a.concat(b))
    //   .reduce((a, b) => a + b);

    const reaservatinSeats = theaterSeats.map(row =>
      row.map((seat, i) => (seat === 2 ? i : -1)).filter(seat => seat !== -1)
    )
      .map((seats, i) => (seats.length ? seats.map(seat => [i, seat]) : -1))
      .filter(seat => seat !== -1)
      .reduce((a, b) => a.concat(b));

    // console.log("seats", seats)
    // console.log("totalBookedSeats", totalBookedSeats)
    // console.log("reaservatinSeats", reaservatinSeats)

    const theaterId = selectedTheater._id;
    const seatsAvailable =
      selectedTheater.seatsAvailable - selectedSeatsList.length;

    const body = {
      seats,
      seatsAvailable
    }
    // console.log("body", body)
    try {
      const res = await TheaterApi.updateTheaterSeatsInfo(theaterId,
        body
      );
      console.log(res);
    } catch (error) {
      console.log('updateTheaterSeatsData error ', error);
    }
  };

  // 극장 좌석 설정
  const handleMovieReservation = () => {
    if (!userInfo) {
      history.push('/signin');
    } else if (selectedSeatsList.length == 0) {
      console.log('choose seats first');
    } else {
      // console.log('handleMovieReservation');
      createMovieReservation();
      updateTheaterSeatsData();
    }
  };

  const handleSelectedTheater = (e) => {
    // console.log("filteredTheatersList", filteredTheatersList)
    const data = e.target.value;
    setSelectedTheater(data);
    setTheaterSeats(data.seats);
    setSeatsAvailable(data.seatsAvailable);
  };

  //test
  const onFiltertheater = () => {
    const initialReturn = {
      filteredTheatersList: [],
      filteredMovieShowTimeList: []
    };

    if (!movieShowTimeList || !theatersList) return initialReturn;

    const movieShowTimeListTest = movieShowTimeList.filter(i => i.movieId == movieId)

    const filteredTheatersId = movieShowTimeListTest.map(i => i.theaterId).filter((value, index, self) => self.indexOf(value) === index)

    const filteredTheatersList = theatersList.filter((theater) =>
      filteredTheatersId.includes(theater._id)
    );


    const filteredMovieShowTimeList = movieShowTimeList
      .filter((movieShowTime) =>
        selectedTheater ? selectedTheater._id === movieShowTime.theaterId : true
      )
      .map((movieShowTime) => movieShowTime)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort(
        (a, b) => new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b)
      );

    return {
      ...initialReturn,
      filteredTheatersList,
      filteredMovieShowTimeList
    };
  };
  const { filteredTheatersList, filteredMovieShowTimeList } =
    onFiltertheater();

  useEffect(() => {
    getMovieShowTimeList();
    getMovieInfo();

    getTheaterList();

    return () => { };
  }, []);

  // console.log('movieId', movieId);
  // console.log('theatersList', theatersList);
  // console.log('movieShowTimeList', movieShowTimeList);
  // console.log('movieShowTimeListTest', movieShowTimeListTest);
  // console.log("filtertheaterIdTest", filtertheaterIdTest)
  // console.log('selectedMovieShowTime', selectedMovieShowTime);
  // console.log('selectedTheater', selectedTheater);
  // console.log('filteredTheatersList', filteredTheatersList);
  // console.log('selectedSeatsList', selectedSeatsList);
  // console.log('selectedSeatsList.lengh', selectedSeatsList.length);

  // console.log('filteredTheatersList', filteredTheatersList);
  // console.log('filteredMovieShowTimeList', filteredMovieShowTimeList);

  const renderMovieInfo = () => {
    if (movie) {
      return (
        <>
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
        </>
      )
    }
  }


  const renderSelectTheaterInfo = () => {
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
                  onChange={(e) =>
                    setSelectedMovieShowTime(e.target.value)
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
            {userInfo && (
              <Grid item xs={12}>
                <Box
                  display="flex"
                  width={1}
                  height={1}
                  alignItems="center"
                  justifyContent="center">
                  <Typography align="center" variant="h2" color="error">
                    You Must Log In
                  </Typography>
                </Box>
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


  const renderSelectTheaterSeats = () => {
    if (selectedTheater && selectedMovieShowTime) {
      return <>
        <Box width={1} pt={15}>
          {selectedTheater.seats != null &&
            selectedTheater.seats.map((seatRows, indexRow) => (
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

        <Box marginTop={2} bgcolor="rgb(18, 20, 24)">
          <Grid container>
            <Grid item xs={10}>
              <Grid container spacing={3} style={{ padding: 20 }}>
                <Grid item>
                  <Typography className={classes.bannerTitle}>
                    Name
                  </Typography>
                  <Typography className={classes.bannerContent}>
                    {userInfo ? userInfo.userName : null}
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
                      {'  '}
                      {' - '}
                    </Typography>
                  )}
                </Grid>
                <Grid item>
                  <Typography className={classes.bannerTitle}>
                    Price
                  </Typography>
                  {!selectedTheater ? (
                    <Typography className={classes.bannerContent}>
                      0 $
                    </Typography>
                  ) : (
                    <Typography className={classes.bannerContent}>
                      {selectedTheater.ticketPrice *
                        selectedSeatsList.length}{' '}
                      $
                    </Typography>
                  )}
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
      </>
    }

  }

  return (
    <>
      <div className={classes.root}>
        <Navbar />
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={2} style={{ height: '100%' }}>
            {renderMovieInfo()}
            <Grid item lg={9} xs={12} md={12}>
              {renderSelectTheaterInfo()}
              {renderSelectTheaterSeats()}
            </Grid>
          </Grid>
        </Container>
        <ResponsiveDialog
          id="Edit-cinema"
          open={isOpenDialog}
          handleClose={handleDialog}
          maxWidth="sm">
          <SignInForm />
        </ResponsiveDialog>
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
