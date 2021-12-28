import { combineReducers } from 'redux';
import alertReducers from './AlertReducers';
import authReducers from './AuthReducers';
import movieReducers from './MoviesReducers';

const alert = alertReducers;
const auth = authReducers;
const movies = movieReducers;

export default combineReducers({
    alert,
    auth,
    movies
});