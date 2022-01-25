import { GET_MOVIESLIST, GET_MOVIE_INFO } from '../Types/Index';
import { setAlert } from './AlertAction';
import * as movieApi from '../../Api/MovieApi/MovieApi';

export const getMovieList = () => async(dispatch) => {
    try {
        const result = await movieApi.getMovieList();
        const responseData = result;
        if (responseData.status == 200) {
            dispatch({ type: GET_MOVIESLIST, payload: responseData });
        } else {
            dispatch(setAlert('Failed to get Movies List', 'error', 3000));
        }
    } catch (error) {
        dispatch(setAlert('Failed to get Movies List', 'error', 3000));
    }
};

export const getMovieInfo = (id) => async(dispatch) => {
    try {
        const result = await movieApi.getMovieInfo(id);
        const responseData = result;
        // console.log('responseData', responseData);
        if (responseData.status == 200) {
            dispatch({ type: GET_MOVIE_INFO, payload: responseData });
        }
    } catch (error) {
        dispatch(setAlert('Failed to get Movies List', 'error', 3000));
    }
};

export const createMovie =
    (
        title,
        image,
        genre,
        language,
        duration,
        description,
        director,
        cast,
        releaseDate,
        endDate
    ) =>
    async(dispatch) => {
        try {
            const result = await movieApi.createMovie(
                title,
                image,
                genre,
                language,
                duration,
                description,
                director,
                cast,
                releaseDate,
                endDate
            );
            console.log('result', result);
            dispatch(setAlert('Create Movie Data', 'success', 3000));
        } catch (error) {
            dispatch(setAlert('Failed to Create Movie', 'error', 3000));
        }
    };

export const updateMovie =
    (
        id,
        title,
        image,
        genre,
        language,
        duration,
        description,
        director,
        cast,
        releaseDate,
        endDate
    ) =>
    async(dispatch) => {
        try {
            const result = await movieApi.updateMovieInfo(
                id,
                title,
                image,
                genre,
                language,
                duration,
                description,
                director,
                cast,
                releaseDate,
                endDate
            );
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