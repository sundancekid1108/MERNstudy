import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import SignInForm from '../SignIn/Components/SignInForm/SignInForm'

import styles from './Styles';

const MovieReservation = (props) => {


  const { classes } = props;
  const params = useParams()
  const navigate = useNavigate();
  const movieId = params.id;
  const nowTime = moment().format('YYYY-MM-DD');
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth.user);
  const movieInfo = useSelector((state) => state.movies.movieInfo);


  const [theaterSeats, setTheaterSeats] = useState([]);
  const [selectedSeatsList, setSelectedSeatsList] = useState([]);

  const [selectedTheater, setSelectedTheater] = useState('');
  const [selectedMovieShowTime, setSelectedMovieShowTime] = useState('');
  const [seatsAvailable, setSeatsAvailable] = useState('');


  const movieShowTimeList = useSelector((state) => state.movieShowTimes.movieShowTimes.filter(i => i.movieId._id == movieId));


  const theatersList = movieShowTimeList.map(theater => theater.theaterId)
  const filteredTheatersList = theatersList.filter((arr, index, callback) => index === callback.findIndex(t => t._id === arr._id))

  const [mustLogin, setMustLogin] = useState(false)

  const filteredMovieShowTimeList = movieShowTimeList
    .filter((movieShowTime) =>
      selectedTheater ? selectedTheater === movieShowTime.theaterId._id : true
    )
    .map((movieShowTime) => movieShowTime)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort(
      (a, b) => new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b)
    );
  // console.log("filteredMovieShowTimeList", filteredMovieShowTimeList)


  //popup dialog 열고 닫기
  const handleDialog = () => {
    if (userInfo !== null) {
      setMustLogin(false)
    } else {
      setMustLogin(true)
    }
  };
  const getMovieInfo = () => {
    dispatch(MovieAction.getMovieInfo(movieId));
  }


  //극장별 영화 상영시간
  const getMovieShowTimeList = () => {
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
    const startAtData = selectedMovieShowTime.startAt;
    const seatsData = selectedSeatsList;
    const seatsAvailableData = seatsAvailable - selectedSeatsList.length
    const ticketPriceData = selectedMovieShowTime.theaterId.ticketPrice
    const totalPriceData = selectedSeatsList.length * selectedMovieShowTime.theaterId.ticketPrice
    const movieIdData = selectedMovieShowTime.movieId._id;
    const theaterIdData = selectedMovieShowTime.theaterId._id;
    const userNameData = userInfo.userName
    const userPhoneNumberData = userInfo.phoneNumber

    const movieShowTimeId = selectedMovieShowTime._id
    const updateTheaterSeatsData = theaterSeats.map((row) =>
      row.map((seat) => ([1, 2].includes(seat) ? 1 : 0))
    );



    const movieReservationBody = {
      startAt: startAtData,
      seats: seatsData,
      ticketPrice: ticketPriceData,
      totalPrice: totalPriceData,
      movieId: movieIdData,
      theaterId: theaterIdData,
      username: userNameData,
      phoneNumber: userPhoneNumberData

    };


    const updateMovieShowTimeBody = {
      seats: updateTheaterSeatsData,
      seatsAvailable: seatsAvailableData
    };



    console.log("movieReservationBody", movieReservationBody)
    console.log("updateMovieShowTimeBody", updateMovieShowTimeBody)

    //1. User MovieReservation 생성
    try {
      const res = await MovieReservationApi.createMovieReservation(
        movieReservationBody
      );
      console.log(res)
    } catch (error) {
      console.log('createMovieReservationError ', error);
    }


    // //2. MovieShowTime seats, seatsAvailable 업데이트..
    updateMovieShowTime(movieShowTimeId, updateMovieShowTimeBody)


  };

  // 예매 후 예매 된 자리 매진 처리하는 극장 자리 정보 업데이트
  const updateMovieShowTime = async (movieShowTimeId, body) => {
    try {
      const res = await MovieShowTimeApi.updateMovieShowTime(
        movieShowTimeId,
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
      navigate('/signin', { replace: false });
    } else if (selectedSeatsList.length === 0) {
      console.log('choose seats first');
    } else {

      createMovieReservation();
      // updateTheaterSeatsData();
    }
  };

  const handleSelectedTheater = (e) => {

    const data = e.target.value;
    setSelectedTheater(selectedTheater => data);
    setSeatsAvailable('')
    setSelectedSeatsList(selectedSeatsList => [])
    setTheaterSeats(theaterSeats => [])


  };

  const handleSelectedMovieShowTime = (e) => {
    setSelectedSeatsList(selectedSeatsList => [])
    setTheaterSeats(theaterSeats => [])
    setSeatsAvailable('')
    const data = e.target.value;
    setSelectedMovieShowTime(selectedMovieShowTime => data)
    // console.log("handleSelectedMovieShowTime Data", data)
    setTheaterSeats(theaterSeats => data.seats)
    setSeatsAvailable(data.seatsAvailable)
    // setSelectedSeatsList(selectedSeatsList => [])



  }

  const handleSelectedFilteredMovieShowTime = (data) => {
    setFilteredMovieShowTime(data)
  }


  useEffect(() => {
    getMovieInfo()
    getMovieShowTimeList();
    handleDialog()

    return () => {

    };
  }, []);



  // console.log("filteredTheatersList", filteredTheatersList)
  // console.log("movieShowTimeList", movieShowTimeList)
  // console.log("selectedTheater", selectedTheater)
  // console.log("userInfo", userInfo)
  // console.log("selectedMovieShowTime", selectedMovieShowTime)
  // console.log("theaterSeats", theaterSeats)
  // console.log("selectedSeatsList", selectedSeatsList)
  // console.log("seatsAvailable", seatsAvailable)

  return (
    <>
      <div className={classes.root}>
        {/* <Navbar /> */}
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={2} style={{ height: '100%' }}>
            <RenderMovieInfo movie={movieInfo} />
            <Grid item lg={9} xs={12} md={12}>


              <RenderSelectTheater
                selectedTheater={selectedTheater}
                handleSelectedTheater={handleSelectedTheater}
                handleSelectedMovieShowTime={handleSelectedMovieShowTime}
                handleSelectedFilteredMovieShowTime={handleSelectedFilteredMovieShowTime}
                selectedMovieShowTime={selectedMovieShowTime}
                movieShowTimeList={movieShowTimeList}

              />

              {selectedTheater && selectedMovieShowTime && (
                <RenderTheaterSeats
                  selectedTheater={selectedTheater}
                  selectedMovieShowTime={selectedMovieShowTime}
                  selectedSeatsList={selectedSeatsList}
                  userInfo={userInfo}
                  handleUserSelectSeats={handleUserSelectSeats}

                />)}

              {selectedTheater && selectedMovieShowTime && (
                <RenderTicketing
                  userInfo={userInfo}
                  seatsAvailable={seatsAvailable}
                  selectedSeatsList={selectedSeatsList}
                  selectedTheater={selectedTheater}
                  selectedMovieShowTime={selectedMovieShowTime}
                  handleMovieReservation={handleMovieReservation}
                />
              )}


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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieReservation);
