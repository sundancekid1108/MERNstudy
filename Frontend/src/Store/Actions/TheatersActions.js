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

export const createTheater =
    (image, theaterName, ticketPrice, city, seats, seatsAvailable) =>
    async(dispatch) => {
        try {
            const result = await theaterApi.createTheater(
                image,
                theaterName,
                ticketPrice,
                city,
                seats,
                seatsAvailable
            );
            console.log('createTheater', result);
            dispatch(setAlert('Create Theater Info', 'success', 3000));
        } catch (error) {
            dispatch(setAlert('Failed to Create Theater Info', 'error', 3000));
        }
    };

export const updateTheater =
    (id, image, theaterName, ticketPrice, city, seats, seatsAvailable) =>
    async(dispatch) => {
        try {
            const result = await theaterApi.updateTheaterInfo(
                id,
                image,
                theaterName,
                ticketPrice,
                city,
                seats,
                seatsAvailable
            );

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