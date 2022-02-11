import {
    GET_THEATERSLIST,
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
        case GET_THEATERSLIST:
            return {
                ...state,
                theaters: payload
            };
        default:
            return state;
    }
};

export default TheatersReducer;