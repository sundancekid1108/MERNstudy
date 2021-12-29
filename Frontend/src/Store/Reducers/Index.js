import { combineReducers } from 'redux';
import alertReducers from './AlertReducers';
import authReducers from './AuthReducers';
import movieReducers from './MoviesReducers';
import theaterReducers from './TheatersReducers';

const alert = alertReducers;
const auth = authReducers;
const movies = movieReducers;
const theaters = theaterReducers;

export default combineReducers({
    alert,
    auth,
    movies,
    theaters
});