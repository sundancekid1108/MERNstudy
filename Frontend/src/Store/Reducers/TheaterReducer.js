import {
    GET_THEATERS_LIST,
    CREATE_THEATER,
    UPDATE_THEATER,
    DELETE_THEATER
} from '../Types/Index';

const initialState = {
    theaters: []
};

const TheatersReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_THEATERS_LIST:
            return {
                ...state,
                theaters: payload
            };
        default:
            return state;
    }
};

export default TheatersReducer;