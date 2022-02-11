import { GET_MOVIE_RESERVATIONS_LIST } from '../Types/Index';
import * as movieReservationApi from '../../Api/MovieReservationApi/MovieReservationApi';
import { setAlert } from './AlertAction';

export const getMovieRservationsList = () => async(dispatch) => {
    try {
        const result = await movieReservationApi.getMovieReservationList();
        const responseData = result;
        if (responseData.status == 200) {
            dispatch({
                type: GET_MOVIE_RESERVATIONS_LIST,
                payload: responseData.data
            });
        }
    } catch (error) {
        dispatch(setAlert('Failed to get Movie Reservation List', 'error', 3000));
    }
};