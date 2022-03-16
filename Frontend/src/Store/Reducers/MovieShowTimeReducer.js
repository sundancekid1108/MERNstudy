import {
    GET_MOVIESHOWTIMES_LIST,
    CREATE_MOVIESHOWTIME,
    UPDATE_MOVIESHOWTIME,
    DELETE_MOVIESHOWTIME
} from '../Types/Index';

const initialState = {
    movieShowTimes: []
};

const MovieShowTimeReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_MOVIESHOWTIMES_LIST:
            return {
                ...state,
                movieShowTimes: payload
            };

        case DELETE_MOVIESHOWTIME:
            return {
                ...state
            };
        default:
            return state;
    }
};

export default MovieShowTimeReducer;