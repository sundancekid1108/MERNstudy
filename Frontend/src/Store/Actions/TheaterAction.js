import { GET_THEATERS_LIST, GET_THEATER_INFO } from '../Types/Index';
import { setAlert } from './AlertAction';
import * as theaterApi from '../../Api/TheaterApi/TheaterApi';

export const getTheaterList = () => async(dispatch) => {
    try {
        const result = await theaterApi.getTheaterList();
        const responseData = result;
        // console.log(responseData);
        if (responseData.status == 200) {
            dispatch({ type: GET_THEATERS_LIST, payload: responseData.data });
        } else {
            dispatch(setAlert('Failed to get Theaters List', 'error', 3000));
        }
    } catch (error) {
        dispatch(setAlert('Failed to get Theaters List', 'error', 3000));
    }
};

export const getTheaterInfo = (theaterId) => async(dispatch) => {
    try {
        const result = await theaterApi.getTheaterInfo(theaterId);
        const responseData = result;
        if (responseData.status == 200) {
            dispatch({ type: GET_THEATER_INFO, payload: responseData.data });
        } else {
            dispatch(setAlert('Failed to get Theater Info', 'error', 3000));
        }
    } catch (error) {
        dispatch(setAlert('Failed to get Theater Info', 'error', 3000));
    }
};

export const createTheater = (body) => async(dispatch) => {
    try {
        console.log(body);
        const result = await theaterApi.createTheater(body);
        console.log('createTheater', result);
        dispatch(setAlert('Create Theater Data', 'success', 3000));
    } catch (error) {
        dispatch(setAlert('Failed to Create Theater Info', 'error', 3000));
    }
};

export const updateTheater = (id, body) => async(dispatch) => {
    try {
        const result = await theaterApi.updateTheaterInfo(id, body);

        console.log('updateTheater', result);
        if (result.status == 200) {
            dispatch(setAlert('Update Theater Info', 'success', 3000));
        } else {
            dispatch(setAlert('Failed to Update Theater Info', 'error', 3000));
        }
    } catch (error) {
        console.log('updateTheater error ', error);
        dispatch(setAlert('Failed to Update Theater Info', 'error', 3000));
    }
};

export const deleteTheater = (id) => async(dispatch) => {
    try {
        const result = await theaterApi.deleteTheaterInfo(id);
        console.log('deleteTheater', result);
        dispatch(setAlert('Success to Theater Info', 'success', 3000));
    } catch (error) {
        dispatch(setAlert('Failed to Delete Theater Info', 'error', 3000));
    }
};