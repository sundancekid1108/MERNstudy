import { combineReducers } from 'redux';
import AlertReducer from './AlertReducer';
import AuthReducer from './AuthReducer';
import MovieReducer from './MovieReducer';
import TheaterReducer from './TheaterReducer';

const alert = AlertReducer;
const auth = AuthReducer;
const movies = MovieReducer;
const theaters = TheaterReducer;

export default combineReducers({
    alert,
    auth,
    movies,
    theaters
});