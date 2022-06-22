import * as userApi from '../../Api/UserApi/UserApi';
import {
    GET_USERS_INFO_LIST,
    GET_USER_INFO,
    CREATE_USER_INFO,
    UPDATE_USER_INFO,
    DELETE_USER_INFO
} from '../Types/UserTypes';
import { setAlert } from './AlertAction';

export const getUserList = () => async(dispatch) => {
    try {
        const result = await userApi.getUsersList();
        const responseData = result;

        if (responseData) {
            dispatch({ type: GET_USERS_INFO_LIST, payload: responseData });
        } else {
            dispatch(setAlert('Failed to get User List', 'error', 3000));
        }
    } catch (error) {
        dispatch(setAlert('Failed to get User List', 'error', 3000));
        console.log(error);
    }
};

export const getUserInfo = (userId) => async(dispatch) => {
    try {
        const result = await userApi.getUserInfo(userId);
        const responseData = result;
    } catch (error) {
        dispatch(setAlert('Failed to get User Info', 'error', 3000));
        console.log(error);
    }
};

export const createUserInfo = () => async(dispatch) => {
    try {} catch (error) {
        console.log(error);
    }
};

export const updateUserInfo = () => async(dispatch) => {
    try {} catch (error) {}
};

export const deleteUserInfo = () => async(dispatch) => {
    try {} catch (error) {}
};