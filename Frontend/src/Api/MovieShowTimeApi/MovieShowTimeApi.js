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
        return error;
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
        return error;
    }
};