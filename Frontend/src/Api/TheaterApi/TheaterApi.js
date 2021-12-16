import api from '../axiosApi';
import authHeader from '../authHeader';

export const getTheatersList = () => {};

export const getTheaterInfo = async(id) => {
    const token = authHeader();
    try {
        const res = await api.get('/theater/theaters/' + String(id), {
            headers: token
        });

        return res;
    } catch (error) {
        return error;
    }
};

export const updateTheaterInfo = async(
    id,
    theaterName,
    ticketPrice,
    city,
    seats,
    seatsAvailable,
    image
) => {
    const token = authHeader();
    const body = {
        theaterName: theaterName,
        ticketPrice: ticketPrice,
        city: city,
        seats: seats,
        seatsAvailable: seatsAvailable,
        image: image
    };
    console.log('updateTheaterInfobody', body);
    try {
        const res = await api.patch('/theater/theaters/' + String(id), body, {
            headers: token
        });

        return res;
    } catch (error) {
        return error;
    }
};

export const updateTheaterSeatsInfo = async(
    id,

    seats,
    seatsAvailable
) => {
    const token = authHeader();
    const body = {
        seats,
        seatsAvailable
    };
    // console.log('updateTheaterInfobody', body);
    try {
        const res = await api.patch('/theater/theaters/' + String(id), body, {
            headers: token
        });

        return res;
    } catch (error) {
        return error;
    }
};