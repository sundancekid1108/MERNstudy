import api from '../axiosApi';
import authHeader from '../authHeader';

export const createMovie = async(
    title,
    image,
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
        image,
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

export const getMovieInfo = async(id) => {
    const token = authHeader();
    try {
        const data = await api.get('/movies/movieinfo/' + id, {
            headers: token
        });
        return data;
    } catch (error) {
        return error;
    }
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

export const updateMovieInfo = async(
    id,
    title,
    image,
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
        image,
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
    try {
        const updateMovieData = await api.patch('/movies/movieinfo/' + id, body, {
            headers: token
        });
        return updateMovieData;
    } catch (error) {
        console.log('updateMovieInfo Error: ', error);
        return error;
    }
};

export const deleteMovie = () => {
    try {} catch (error) {}
};