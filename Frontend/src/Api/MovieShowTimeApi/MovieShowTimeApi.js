import api from '../axiosApi';
import authHeader from '../authHeader';

export const getMovieShowTimeList = async() => {
    const token = authHeader();
    try {
        const res = await api.get('/movieshowtime/movieshowtime/', {
            headers: token
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const createMovieShowTime = async(body) => {
    const token = authHeader();
    try {
        const res = await api.post('/movieshowtime/movieshowtime', body, {
            headers: token
        });
        const movieShowTime = res;
        return movieShowTime;
    } catch (error) {
        console.log('createMovieShowTime Error: ', error);
    }
};

export const updateMovieShowTime = async(id, body) => {
    const token = authHeader();
    try {
        const res = await api.post('/movieshowtime/movieshowtime/' + id, body, {
            headers: token
        });
        return res;
    } catch (error) {
        console.log('updateMovieShowTime Error: ', error);
        return error.response;
    }
};

export const deleteMovieShowTime = async(id) => {
    const token = authHeader();
    try {
        const res = await api.delete('/movieshowtime/movieshowtime/' + id, {
            headers: token
        });

        return res;
    } catch (error) {
        return error.response;
    }
};