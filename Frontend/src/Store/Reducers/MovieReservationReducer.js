import { GET_MOVIE_RESERVATIONS_LIST, GET_USER_MOVIE_RESERVATIONS_LIST } from '../Types/Index';

const initialState = {
    movieReservations: []
};

const MovieReservationReducer = (state = initialState, action) => {
    const { type, payload } = action;
    // console.log("MovieReservationReducer payload.data", payload)
    switch (type) {
        case GET_MOVIE_RESERVATIONS_LIST:
            return {
                ...state,
                movieReservations: payload.data
            };

        case GET_USER_MOVIE_RESERVATIONS_LIST:
            return {
                ...state,
                userMovieReservations: payload.data
            }
        default:
            return state;
    }
};

export default MovieReservationReducer;