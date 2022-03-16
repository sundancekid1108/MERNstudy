import { combineReducers } from 'redux';
import AlertReducer from './AlertReducer';
import AuthReducer from './AuthReducer';
import MovieReducer from './MovieReducer';
import TheaterReducer from './TheaterReducer';
import MovieReservationReducer from './MovieReservationReducer';
import MovieShowTimeReducer from './MovieShowTimeReducer';

const alert = AlertReducer;
const auth = AuthReducer;
const movies = MovieReducer;
const theaters = TheaterReducer;
const movieReservations = MovieReservationReducer;
const movieShowTimes = MovieShowTimeReducer;

export default combineReducers({
    alert,
    auth,
    movies,
    theaters,
    movieReservations,
    movieShowTimes
});