import { GET_MOVIE_RESERVATIONS_LIST } from '../Types/Index';

const initialState = {
    movieReservatinList: []
};

const MovieReservationReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_MOVIE_RESERVATIONS_LIST:
            return {
                ...state,
                movieReservatinList: payload
            };
        default:
            return state;
    }
};

export default MovieReservationReducer;