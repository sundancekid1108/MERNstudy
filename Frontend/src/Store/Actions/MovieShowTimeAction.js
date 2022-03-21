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

export const createMovieShowTime = (body) => async(dispatch) => {
    try {
        const result = await MovieShowTimeApi.createMovieShowTime(body);
        dispatch(setAlert('Create MovieShowTime Data', 'success', 3000));
    } catch (error) {
        dispatch(setAlert('Failed to create MovieShowTime Data', 'error', 3000));
    }
};

export const updateMovieShowTime = (id, body) => async(dispatch) => {
    try {
        const result = await MovieShowTimeApi.updateMovieShowTime(id, body);
        dispatch(setAlert('Update MovieShowTime Data', 'success', 3000));
    } catch (error) {
        dispatch(setAlert('Failed to Update MovieShowTime Data', 'error', 3000));
    }
};

export const deleteMovieShowTime = (id) => async(dispatch) => {
    try {
        const result = await MovieShowTimeApi.deleteMovieShowTime(id);
        dispatch(setAlert('Delete MovieShowTime Data', 'success', 3000));
    } catch (error) {
        dispatch(setAlert('Failed to Delete MovieShowTime Data', 'error', 3000));
    }
};