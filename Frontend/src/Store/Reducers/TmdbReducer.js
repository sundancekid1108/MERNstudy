import { GET_TMDB_MOVIES_LIST } from '../Types/TmdbTypes';

const initialState = {
    tmdbMovies: []
}

const TmdbReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_TMDB_MOVIES_LIST:
            return {
                ...state,
                tmdbMovies: payload.data
            }
        default:
            return {
                ...state,
            }
    }
}

export default TmdbReducer