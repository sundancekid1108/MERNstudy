import { combineReducers } from 'redux';
import AlertReducer from './AlertReducer';
import AuthReducer from './AuthReducer';
import MovieReducer from './MovieReducer';
import TheaterReducer from './TheaterReducer';
import MovieReservationReducer from './MovieReservationReducer';
import MovieShowTimeReducer from './MovieShowTimeReducer';
import UserReducer from './UserReducer';
import TmdbReducer from './TmdbReducer'

const alert = AlertReducer;
const auth = AuthReducer;
const movies = MovieReducer;
const theaters = TheaterReducer;
const movieReservations = MovieReservationReducer;
const movieShowTimes = MovieShowTimeReducer;
const users = UserReducer;
const tmdbMovies = TmdbReducer

export default combineReducers({
    alert,
    auth,
    movies,
    theaters,
    movieReservations,
    movieShowTimes,
    users,
    tmdbMovies
});