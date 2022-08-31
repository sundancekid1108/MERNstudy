import { GET_MOVIES_LIST, GET_MOVIE_INFO } from '../Types/Index';

const initialState = {
    movies: [],
    latestMovies: [],
    nowShowing: [],
    comingSoon: [],
    movieInfo: []
};

const MoviesReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_MOVIES_LIST:
            return {
                ...state,
                movies: payload.data,
                latestMovies: payload.data
                    .sort((a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate))
                    .slice(0, 5),
                nowShowing: payload.data.filter(
                    (movie) =>
                    new Date(movie.endDate) >= new Date() &&
                    new Date(movie.startDate) < new Date()
                ),
                comingSoon: payload.data.filter(
                    (movie) => new Date(movie.startDate) > new Date()
                )
            };
        case GET_MOVIE_INFO:
            return {
                ...state,
                movieInfo: payload.data
            };
        default:
            return {...state };
    }
};

export default MoviesReducer;