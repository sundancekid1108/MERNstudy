import { GET_MOVIESLIST } from '../Types/Index';
import { setAlert } from './AlertActions';
import * as movieApi from '../../Api/MovieApi/MovieApi';

export const getMoviesList = () => async(dispatch) => {
    try {
        const result = await movieApi.getMoviesList();
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