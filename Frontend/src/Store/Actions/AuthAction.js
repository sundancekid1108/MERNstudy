import { setAlert } from './AlertAction';
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



export const userSignIn = (body) => async(dispatch) => {
    try {
        const result = await userApi.userLogin(body);
        const responseData = result;
        console.log('authaction userSignIn', responseData);
        if (responseData.status == 200) {
            dispatch({ type: SIGN_IN_SUCCESS, payload: responseData.data });
            dispatch(setAlert('Login Success', 'success', 3000));
        } else {
            dispatch({ type: SIGN_IN_FAIL });
            dispatch(
                setAlert('Login failed Check your Email and Password', 'error', 3000)
            );
        }
        return responseData;
    } catch (error) {
        dispatch({ type: SIGN_IN_FAIL });
        dispatch(
            setAlert('Login failed Check your Email and Password', 'error', 3000)
        );
        return error;
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
        // console.log('authaction facebook', responseData);

        if (responseData.status == 200) {
            dispatch({ type: SIGN_IN_SUCCESS, payload: responseData.data });
            dispatch(setAlert('LOGIN Success', 'success', 3000));
        } else {
            dispatch({ type: SIGN_IN_FAIL });
            dispatch(setAlert(responseData.error.message, 'error', 3000));
        }
        return responseData;
    } catch (error) {
        dispatch({ type: SIGN_IN_FAIL });
        dispatch(setAlert('Facebook Auth Login Fail!!', 'error', 3000));
        return error;
    }
};

export const userGoogleAuthLogin = (e) => async(dispatch) => {
    try {
        const responseData = await userApi.userGoogleAuthLogin(e);
        // console.log(responseData);
        if (responseData.status == 200) {
            dispatch({ type: SIGN_IN_SUCCESS, payload: responseData.data });
            dispatch(setAlert('LOGIN Success', 'success', 3000));
        } else {
            dispatch({ type: SIGN_IN_FAIL });
            dispatch(setAlert(responseData.error.message, 'error', 3000));
        }
        return responseData;
    } catch (error) {
        dispatch({ type: SIGN_IN_FAIL });
        dispatch(setAlert('Google Auth Login Fail!!', 'error', 3000));
        return error;
    }
};


export const userSignUp = (body) => async(dispatch) => {
    try {
        const result = await userApi.userSignUp(body);
        const responseData = result;
        // console.log(responseData);

        if (responseData.status == 200) {
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
        return error;
    }
};

// log out
export const userLogOut = () => (dispatch) => {
    userApi.userLogout();
    dispatch({ type: LOG_OUT });
    dispatch(setAlert('log out!', 'success', 3000));
};

// userinfo(currentUser)
export const getLoginUserInfo = () => async(dispatch) => {
    const result = await userApi.getUserInfo();
    const responseData = result;

    if (responseData.status == 200) {
        dispatch({ type: GET_USER_INFO, payload: responseData.data });
    } else {
        dispatch({ type: AUTH_ERROR });
    }
};