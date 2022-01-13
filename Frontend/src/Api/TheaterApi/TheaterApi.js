import api from '../axiosApi';
import authHeader from '../authHeader';

export const getTheatersList = async() => {
    const token = authHeader();
    try {
        const res = await api.get('/theater/theaters/', {
            headers: token
        });

        return res;
    } catch (error) {
        return error;
    }
};

export const createTheater = async(
    image,
    theaterName,
    ticketPrice,
    city,
    seats,
    seatsAvailable
) => {
    const token = authHeader();
    const body = { image, theaterName, ticketPrice, city, seats, seatsAvailable };
    try {
        const res = await api.post('/theater/theaters/', body, {
            headers: token
        });

        return res;
    } catch (error) {
        return error;
    }
};

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
    image,
    theaterName,
    ticketPrice,
    city,
    seats,
    seatsAvailable
) => {
    const token = authHeader();
    // const body = {
    //     theaterName: theaterName,
    //     ticketPrice: ticketPrice,
    //     city: city,
    //     seats: seats,
    //     seatsAvailable: seatsAvailable,
    //     image: image
    // };
    const body = {
        image,
        theaterName,
        ticketPrice,
        city,
        seats,
        seatsAvailable
    };
    console.log('updateTheaterInfobody', body);
    console.log(id);
    try {
        const res = await api.patch('/theater/theaters/' + id, body, {
            headers: token
        });
        console.log('updateTheaterInfo res', res);
        return res;
    } catch (error) {
        console.log('updateTheaterInfo error', error);
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

export const deleteTheaterInfo = async(id) => {
    const token = authHeader();
    try {
        const res = await api.delete('/theater/theaters/' + id, {
            headers: token
        });
        return res;
    } catch (error) {
        console.log('deleteTheaterInfo: ', error);
        return error;
    }
};