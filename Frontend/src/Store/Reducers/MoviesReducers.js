import { GET_MOVIESLIST } from '../Types/Index';

const initialState = {
    movies: [],
    latestMovies: []
};

const moviesReducers = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_MOVIESLIST:
            return {
                ...state,
                movies: payload.data,
                latestMovies: payload.data
                    .sort((a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate))
                    .slice(0, 5)
            };
        default:
            return state;
    }
};

export default moviesReducers;