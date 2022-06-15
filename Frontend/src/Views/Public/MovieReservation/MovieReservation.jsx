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
import RenderMovieInfo from './Components/RenderMovieInfo/RenderMovieInfo';
import RenderSelectTheater from './Components/RenderSelectTheater/RenderSelectTheater';
import RenderTheaterSeats from './Components/RenderTheaterSeats/RenderTheaterSeats';
import RenderTicketing from './Components/RenderTicketing/RenderTicketing';
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
  const movieInfoTest = useSelector((state) => state.movies.movieInfo);
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
    if (userInfo !== null) {
      setMustLogin(false)
    } else {
      setMustLogin(true)
    }
  };



  //영화정보
  const getMovieInfo = async () => {
    try {
      const res = await MovieApi.getMovieInfo(movieId);
      const movieData = res.data;
      setMovie(movieData);
    } catch (error) {
      console.log('getMovieInfo', error);
    }
  };

  const getMovieInfoTest = () => {
    dispatch(MovieAction.getMovieInfo(movieId));
  }


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
    updateTheaterSeatsData();
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
      // updateTheaterSeatsData();
    }
  };

  const handleSelectedTheater = (e) => {
    // console.log("filteredTheatersList", filteredTheatersList)
    const data = e.target.value;
    setSelectedTheater(data);
    setTheaterSeats(data.seats);
    setSeatsAvailable(data.seatsAvailable);
  };

  const handleSelectedMovieShowTime = (e) => {
    const data = e.target.value;
    setSelectedMovieShowTime(data)
  }

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
    getMovieInfoTest()
    getMovieInfo();
    getTheaterList();
    handleDialog()
    return () => { };
  }, []);


  console.log("selectedSeatsList", selectedSeatsList)
  console.log("userInfo", userInfo)

  return (
    <>
      <div className={classes.root}>
        <Navbar />
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={2} style={{ height: '100%' }}>
            <RenderMovieInfo movie={movieInfoTest} />
            <Grid item lg={9} xs={12} md={12}>
              <RenderSelectTheater
                filteredTheatersList={filteredTheatersList}
                selectedTheater={selectedTheater}
                selectedMovieShowTime={selectedMovieShowTime}
                handleSelectedTheater={handleSelectedTheater}
                handleSelectedMovieShowTime={handleSelectedMovieShowTime}
                filteredMovieShowTimeList={filteredMovieShowTimeList}
              />
              <RenderTheaterSeats
                selectedTheater={selectedTheater}
                selectedMovieShowTime={selectedMovieShowTime}
                selectedSeatsList={selectedSeatsList}
                userInfo={userInfo}
                handleUserSelectSeats={handleUserSelectSeats}

              />
              <RenderTicketing
                userInfo={userInfo}
                selectedSeatsList={selectedSeatsList}
                selectedTheater={selectedTheater}
                seatsAvailable={seatsAvailable}
                selectedMovieShowTime={selectedMovieShowTime}
                handleMovieReservation={handleMovieReservation}
              />
            </Grid>
          </Grid>
        </Container>
        <ResponsiveDialog
          open={mustLogin}
          // handleClose={() => setMustLogin(false)}
          // handleClose={() => handleDialog()}
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
