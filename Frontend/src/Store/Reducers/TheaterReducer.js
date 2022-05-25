import {
    GET_THEATERS_LIST,
    GET_THEATER_INFO,
    CREATE_THEATER,
    UPDATE_THEATER,
    DELETE_THEATER
} from '../Types/Index';

const initialState = {
    theaters: [],
    selectedTheater: null
};

const TheatersReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_THEATERS_LIST:
            return {
                ...state,
                theaters: payload
            };
        case GET_THEATER_INFO:
            return {
                ...state,
                theaterInfo: payload
            };
        default:
            return state;
    }
};

export default TheatersReducer;