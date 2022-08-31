import api from '../axiosApi';
import axios from 'axios';
import authHeader from '../authHeader';

export const getTmdbUpcomingMovieList = async() => {
    const token = authHeader();
    try {
        const response = await api.get('/movies/tmdbmovielist', {
                headers: token
            })
            // console.log(response)
        return response

    } catch (error) {
        console.log("getTmdbUpcomingMovieList error", error)
    }
}

export const getSearchTmdbMovie = async(query) => {
    const token = authHeader();
    try {
        const response = await api.get('/movies/tmdbmovielist/' + String(query), {
            headers: token
        })

        return response
    } catch (error) {
        return error.response
    }
}

export const getTmdbMovieInfoById = async(id) => {
    const token = authHeader();
    try {
        const response = await api.get('/movies/tmdbmovieinfo/' + String(id), {
            headers: token
        })
        return response

    } catch (error) {
        return error.response
    }
}

export const getTmdbMovieCreditsInfoById = async(id) => {
    const token = authHeader();
    try {
        const response = await api.get('/movies/tmdbmoviecredits/' + String(id), {
            headers: token
        })
        return response

    } catch (error) {
        return error.response
    }

}

export const getTmdbMovieList = async() => {
    const token = authHeader();
    try {
        const response = await api.get('/movies/tmdbmovielist/savetmdbmovielist', {
            headers: token
        })
        return response

    } catch (error) {
        return error.response
    }
}

export const createTmdbMovie = async(body) => {
    const token = authHeader();
    try {
        const response = await api.post('/movies/tmdbmovies', body, { headers: token })
        return response
    } catch (error) {
        console.log(error)
        return error.response
    }
}