import api from '../axiosApi';
import authHeader from '../authHeader';

export const createMovie = async(body) => {
    const token = authHeader();

    try {
        const response = await api.post('/movies/movies', body, { headers: token });
        return response
    } catch (error) {
        // console.log("createMovie error.response", error.response);
        // const errorData = error.json();
        return error.response;
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
        return error.response;
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
        return error.response;
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
        return error.response;
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
        return error.response;
    }
};