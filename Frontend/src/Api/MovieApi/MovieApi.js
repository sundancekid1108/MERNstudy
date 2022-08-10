import api from '../axiosApi';
import authHeader from '../authHeader';

export const createMovie = async(body) => {
    const token = authHeader();

    try {
        const res = await api.post('/movies/movies', body, { headers: token });

        // console.log('createMovie res', res);
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
        const data = await api.get('/movies/movieinfo/' + String(id), {
            headers: token
        });
        return data;
    } catch (error) {
        return error;
    }
};

export const getMovieList = async() => {
    const token = authHeader();
    try {
        const movieListData = await api.get('/movies/movielist', {
            headers: token
        });
        return movieListData;
    } catch (error) {
        console.log('getMovieListError: ', error);
        return error;
    }
};

export const updateMovieInfo = async(id, body) => {
    const token = authHeader();
    try {
        const updateMovieData = await api.post('/movies/movieinfo/' + id, body, {
            headers: token
        });
        return updateMovieData;
    } catch (error) {
        console.log('updateMovieInfo Error: ', error);
        return error;
    }
};

export const deleteMovie = async(id) => {
    const token = authHeader();
    try {
        const res = await api.delete('/movies/movieinfo/' + id, {
            headers: token
        });
        return res;
    } catch (error) {
        console.log('getMovieListError: ', error);
        return error;
    }
};