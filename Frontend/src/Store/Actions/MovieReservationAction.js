import { GET_MOVIE_RESERVATIONS_LIST, GET_USER_MOVIE_RESERVATIONS_LIST } from '../Types/Index';
import * as movieReservationApi from '../../Api/MovieReservationApi/MovieReservationApi';
import { setAlert } from './AlertAction';

export const createMovieReservation = () => async(dispatch) => {};

export const getMovieRservationsList = () => async(dispatch) => {
    try {
        const result = await movieReservationApi.getMovieReservationList();

        const responseData = result;
        // console.log("getMovieRservationsList Action", responseData)
        if (responseData.status == 200) {
            dispatch({
                type: GET_MOVIE_RESERVATIONS_LIST,
                payload: responseData
            });
        }
    } catch (error) {
        dispatch(setAlert('Failed to get Movie Reservation List', 'error', 3000));
    }
};

export const getUserMovieReservationList = (id) => async(dispatch) => {
    try {
        const result = await movieReservationApi.getUsermovieReservationList(id)
        const responseData = result;
        // console.log("getUserMovieReservationList Action", responseData)
        if (responseData.status == 200) {
            dispatch({
                type: GET_USER_MOVIE_RESERVATIONS_LIST,
                payload: responseData
            });
        }
    } catch (error) {
        dispatch(setAlert('Failed to get User Movie Reservation List', 'error', 3000));
    }
}