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

export const userSignIn = (userEmail, userPassword) => async(dispatch) => {
    try {
        const result = await userApi.userLogin(userEmail, userPassword);
        const responseData = result;
        console.log('authaction userSignIn', responseData);
        if (responseData.accessToken) {
            dispatch({ type: SIGN_IN_SUCCESS, payload: responseData });
            dispatch(setAlert('Login Success', 'success', 3000));
        } else {
            dispatch({ type: SIGN_IN_FAIL });
            dispatch(
                setAlert('Login failed Check your Email and Password', 'error', 3000)
            );
        }
    } catch (error) {
        dispatch({ type: SIGN_IN_FAIL });
        dispatch(
            setAlert('Login failed Check your Email and Password', 'error', 3000)
        );
    }
};

export const userFacebookAuthLogin = (e) => async(dispatch) => {
    // console.log(e);
    const { accessToken, email, userID, name } = e;

    try {
        const responseData = await userApi.userFacebookAuthLogin(
            accessToken,
            email,
            userID,
            name
        );
        console.log('authaction facebook', responseData);

        if (responseData.status == 200) {
            dispatch({ type: SIGN_IN_SUCCESS, payload: responseData.data });
            dispatch(setAlert('LOGIN Success', 'success', 3000));
        } else {
            dispatch({ type: SIGN_IN_FAIL });
            dispatch(setAlert(responseData.error.message, 'error', 3000));
        }
    } catch (error) {
        dispatch({ type: SIGN_IN_FAIL });
        dispatch(setAlert('Facebook Auth Login Fail!!', 'error', 3000));
    }
};

export const userGoogleAuthLogin = () => async(dispatch) => {};

export const userSignUp = (a, b, c, d, e, f) => async(dispatch) => {
    try {
        const result = await userApi.userSignUp(a, b, c, d, e, f);
        const responseData = result;
        // console.log(responseData);

        if (responseData.status == 201) {
            dispatch({ type: SIGN_UP_SUCCESS, payload: responseData });
            dispatch(setAlert('SignUp Success', 'success', 3000));
        } else {
            dispatch({ type: SIGN_UP_FAIL });
            dispatch(setAlert('Sign up Fail', 'error', 3000));
        }
        return responseData;
    } catch (error) {
        dispatch({ type: SIGN_UP_FAIL });
        dispatch(setAlert('Sign up Fail', 'error', 3000));
    }
};

// log out
export const userLogOut = () => (dispatch) => {
    userApi.userLogout();
    dispatch({ type: LOG_OUT });
    dispatch(setAlert('log out!', 'success', 3000));
};

// userinfo
export const getLoginUserInfo = () => async(dispatch) => {
    const result = await userApi.getUserInfo();
    const responseData = result;
    // console.log('getLoginUserInfo: ', responseData);
    if (responseData) {
        dispatch({ type: GET_USER_INFO, payload: responseData });
    } else {
        dispatch({ type: AUTH_ERROR });
    }
};