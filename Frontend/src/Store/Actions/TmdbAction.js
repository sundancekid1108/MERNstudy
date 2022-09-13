import { GET_TMDB_MOVIES_LIST } from '../Types/TmdbTypes'
import { setAlert } from './AlertAction';
import * as TmdbApi from '../../Api/TmdbApi/TmdbApi'

export const getTmdbMovieList = () => async(dispatch) => {
    try {
        const result = await TmdbApi.getTmdbMovieList()
        const responseData = result
        console.log("getTmdbMovieList", responseData)
        if (responseData.status == 200) {
            dispatch({ type: GET_TMDB_MOVIES_LIST, payload: responseData });
        } else {
            dispatch(setAlert('Failed to get TMDB Movie List', 'error', 3000));
        }

    } catch (error) {
        dispatch(setAlert('Failed to get TMDB Movie List', 'error', 3000));
    }
}