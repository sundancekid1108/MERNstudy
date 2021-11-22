import api from '../axiosApi';
import authHeader from '../authHeader';

export const createMovie = async(
    title,
    genre,
    language,
    duration,
    description,
    director,
    cast,
    releaseDate,
    endDate
) => {
    const body = {
        title,
        genre,
        language,
        duration,
        description,
        director,
        cast,
        releaseDate,
        endDate
    };
    const token = authHeader();
    // debugger;
    // body = JSON.stringify(body);
    console.log(body);

    try {
        const res = await api.post('/movies/movies', body, { headers: token });

        console.log('createMovie res', res);
        const movie = await res.json();
        return movie;
    } catch (error) {
        // console.log(error);
        // const errorData = error.json();
        return error;
    }
};

export const getMovieInfo = () => {
    const token = authHeader();
    try {} catch (error) {}
};

export const getMoviesList = async() => {
    const token = authHeader();
    try {
        const movieListData = await api.get('/movies/movieslist', {
            headers: token
        });
        console.log('getMoviesListData: ', movieListData);
        return movieListData;
    } catch (error) {
        console.log('getMoviesListError: ', error);
        return error;
    }
};

export const updateMovieInfo = () => {
    try {} catch (error) {}
};

export const deleteMovie = () => {
    try {} catch (error) {}
};