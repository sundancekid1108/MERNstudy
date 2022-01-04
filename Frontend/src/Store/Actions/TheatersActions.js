import { GET_THEATERSLIST } from '../Types/Index';
import { setAlert } from './AlertActions';
import * as theaterApi from '../../Api/TheaterApi/TheaterApi';

export const getTheatersList = () => async(dispatch) => {
    try {
        const result = await theaterApi.getTheatersList();
        const responseData = result;
        // console.log(responseData);
        if (responseData.status == 200) {
            dispatch({ type: GET_THEATERSLIST, payload: responseData.data });
        } else {
            dispatch(setAlert('Failed to get Theaters List', 'error', 3000));
        }
    } catch (error) {
        dispatch(setAlert('Failed to get Theaters List', 'error', 3000));
    }
};