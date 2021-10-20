import { setAlert } from './AlertActions';
import {
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL,
    GET_USER_INFO,
    LOG_OUT,
    AUTH_ERROR
} from '../Types/Index';
import * as userApi from '../../Api/UserApi/UserApi';

// signup

// signin
export const userSignIn = (userEmail, userPassword) => async(dispatch) => {
    const result = await userApi.userLogin(userEmail, userPassword);
    const responseData = result;
    console.log('authaction usersignin :', responseData);
    if (responseData.accessToken) {
        dispatch({ type: SIGN_IN_SUCCESS, payload: responseData });
        dispatch(setAlert('Login Success', 'success', 5000));
    } else {
        dispatch({ type: SIGN_IN_FAIL });
        dispatch(
            setAlert('Login failed Check your Email and Password', 'error', 5000)
        );
    }
};

// log out
export const userLogOut = () => (dispatch) => {
    userApi.userLogout();
    dispatch({ type: LOG_OUT });
    dispatch(setAlert('log out!', 'success', 5000));
};
// userinfo
export const getUserInfo = () => async(dispatch) => {
    const result = await userApi.getUserInfo();
    const responseData = result;
    if (responseData) {
        dispatch({ type: 'GET_USER_INFO', data: responseData });
    } else {
        dispatch({ type: AUTH_ERROR });
    }
};