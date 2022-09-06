import api from '../axiosApi';
import authHeader from '../authHeader';

export const createMovieReservation = async(body) => {
    const token = authHeader();

    try {
        const res = await api.post('/moviereservation/moviereservations', body, {
            headers: token
        });
        const reservationData = res;
        return reservationData;
    } catch (error) {
        return error.response;
    }
};

export const getMovieReservationList = async() => {
    const token = authHeader();
    try {
        const res = await api.get('/moviereservation/moviereservations', {
            headers: token
        });
        const reservationData = res.data;
        return reservationData;
    } catch (error) {
        return error.response;
    }
};