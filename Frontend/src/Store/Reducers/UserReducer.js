import {
    GET_USERS_INFO_LIST,
    GET_USER_INFO,
    CREATE_USER_INFO,
    UPDATE_USER_INFO,
    DELETE_USER_INFO
} from '../Types/UserTypes';

const initialState = {
    users: []
};

const UserReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_USERS_INFO_LIST:
            return {
                ...state,
                users: payload
            };
        case GET_USER_INFO:
            return {
                ...state,
                user: payload.data
            };
        default:
            return {
                ...state
            };
    }
};

export default UserReducer;