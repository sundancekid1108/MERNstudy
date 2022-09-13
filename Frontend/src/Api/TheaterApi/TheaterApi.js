import api from '../axiosApi';
import authHeader from '../authHeader';

export const getTheaterList = async() => {
    const token = authHeader();
    try {
        const res = await api.get('/theater/theaters/', {
            headers: token
        });

        // console.log(res)
        return res;
    } catch (error) {
        return error.response;
    }
};

export const createTheater = async(body) => {
    const token = authHeader();
    try {
        const res = await api.post('/theater/theaters/', body, {
            headers: token
        });

        return res;
    } catch (error) {
        return error.response;
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
        return error.response;
    }
};

export const updateTheaterInfo = async(id, body) => {
    const token = authHeader();

    // console.log('updateTheaterInfobody', body);
    // console.log(id);
    try {
        const res = await api.post('/theater/theaters/' + id, body, {
            headers: token
        });
        // console.log('updateTheaterInfo res', res);
        return res;
    } catch (error) {
        console.log('updateTheaterInfo error', error);
        return error.response;
    }
};

export const updateTheaterSeatsInfo = async(id, body) => {
    const token = authHeader();
    // const body = {
    //     seats,
    //     seatsAvailable
    // };
    // console.log('updateTheaterInfobody', body);
    try {
        const res = await api.post('/theater/theaters/' + String(id), body, {
            headers: token
        });

        return res;
    } catch (error) {
        return error.response;
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
        return error.response;
    }
};