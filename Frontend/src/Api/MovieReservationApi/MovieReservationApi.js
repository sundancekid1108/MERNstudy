import api from '../axiosApi';
import authHeader from '../authHeader';

export const createMovieReservation = async(
    startAt,
    seats,
    ticketPrice,
    totalPrice,
    movieId,
    theaterId
) => {
    const token = authHeader();
    const body = {
        startAt,
        seats,
        ticketPrice,
        totalPrice,
        movieId,
        theaterId
    };
    console.log(body);
    try {
        const res = await api.post('/moviereservation/moviereservations', body, {
            headers: token
        });
        const reservationData = res.json();
        return reservationData;
    } catch (error) {
        return error;
    }
};