import { combineReducers } from 'redux';
import alertReducers from './AlertReducers';
import authReducers from './AuthReducers';
import moviesReducers from './MoviesReducers';
import theatersReducers from './TheatersReducers';

const alert = alertReducers;
const auth = authReducers;
const movies = moviesReducers;
const theaters = theatersReducers;

export default combineReducers({
    alert,
    auth,
    movies,
    theaters
});