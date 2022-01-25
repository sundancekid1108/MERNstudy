import {
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAIL,
    GET_USER_INFO,
    LOG_OUT,
    AUTH_ERROR
} from '../Types/AuthTypes';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null
};

const AuthReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SIGN_IN_SUCCESS:
            // token: localStorage.setItem('token', JSON.stringify(payload.accessToken));
            return {
                ...state,
                user: payload,
                token: payload.accessToken,
                isAuthenticated: true,
                loading: false
            };
        case SIGN_IN_FAIL:
        case LOG_OUT:
            return {
                ...state,
                token: '',
                isAuthenticated: false,
                user: null,
                loading: false
            };
        case GET_USER_INFO:
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                loading: false
            };
        default:
            return state;
    }
};

export default AuthReducer;