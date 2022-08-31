import { GET_MOVIES_LIST, GET_MOVIE_INFO } from '../Types/Index';
import { setAlert } from './AlertAction';
import * as movieApi from '../../Api/MovieApi/MovieApi';

export const getMovieList = () => async(dispatch) => {
    try {
        const result = await movieApi.getMovieList();
        const responseData = result;
        if (responseData.status == 200) {
            dispatch({ type: GET_MOVIES_LIST, payload: responseData });
        } else {
            dispatch(setAlert('Failed to get Movies List', 'error', 3000));
        }

    } catch (error) {
        dispatch(setAlert('Failed to get Movies List', 'error', 3000));
    }
};

export const getMovieInfo = (movieId) => async(dispatch) => {
    try {
        // console.log('movieId', movieId);
        const result = await movieApi.getMovieInfo(movieId);
        const responseData = result;
        // console.log('responseData', responseData);
        if (responseData.status == 200) {
            dispatch({ type: GET_MOVIE_INFO, payload: responseData });
        }
    } catch (error) {
        dispatch(setAlert('Failed to get Movie Info', 'error', 3000));
    }
};

export const createMovie = (body) => async(dispatch) => {
    try {
        const result = await movieApi.createMovie(body);
        // console.log('result', result);
        return result
        dispatch(setAlert('Create Movie Data', 'success', 3000));
    } catch (error) {
        dispatch(setAlert('Failed to Create Movie', 'error', 3000));
    }
};

export const updateMovie = (id, body) => async(dispatch) => {
    try {
        const result = await movieApi.updateMovieInfo(id, body);
        console.log('updateTheater', result);
        if (result.status == 200) {
            dispatch(setAlert('Update Theater Info', 'success', 3000));
        } else {
            dispatch(setAlert('Failed to Update Theater Info', 'error', 3000));
        }
    } catch (error) {
        dispatch(setAlert('Failed to Update Movie data', 'error', 3000));
    }
};

export const deleteMovie = (id) => async(dispatch) => {
    try {
        const result = await movieApi.deleteMovie(id);
        console.log('deleteMovie', result);

        dispatch(setAlert('Success to Movie Info', 'success', 3000));
    } catch (error) {
        dispatch(setAlert('Failed to Delete Movie Info', 'error', 3000));
    }
};