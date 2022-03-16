import {
    GET_MOVIESHOWTIMES_LIST,
    CREATE_MOVIESHOWTIME,
    UPDATE_MOVIESHOWTIME,
    DELETE_MOVIESHOWTIME
} from '../Types/Index';
import * as MovieShowTimeApi from '../../Api/MovieShowTimeApi/MovieShowTimeApi';
import { setAlert } from './AlertAction';

export const getMovieShowTimesList = () => async(dispatch) => {
    try {
        const result = await MovieShowTimeApi.getMovieShowTimeList();
        if (result.status == 200) {
            dispatch({ type: GET_MOVIESHOWTIMES_LIST, payload: result.data });
        } else {
            dispatch(setAlert('Failed to get MovieSowTimeList', 'error', 3000));
        }
    } catch (error) {
        dispatch(setAlert('Failed to get MovieSowTimeList', 'error', 3000));
    }
};

export const createMovieShowTime = () => async(dispatch) => {
    try {} catch (error) {}
};

export const updateMovieShowTime = () => async(dispatch) => {
    try {} catch (error) {}
};

export const deleteMovieShowTime = () => async(dispatch) => {
    try {} catch (error) {}
};