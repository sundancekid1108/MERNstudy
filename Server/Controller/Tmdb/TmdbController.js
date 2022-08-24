import TmdbMovie from '../../Database/Model/TmdbMovie/TmdbMovie';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express'
import request from 'request'

dotenv.config();

const { ObjectId } = mongoose.Types;

const TMDB_APIKEY = process.env.TMDB_API_KEY
const TMDB_URL = process.env.TMDB_URL

export const tmdbGetUpcomingMovieList = (req, res, body) => {
    console.log(TMDB_URL + TMDB_APIKEY)
    request(TMDB_URL + "movie/upcoming?api_key=" + TMDB_APIKEY, (error, response, body) => {
        if (error) {
            console.log(error);
        } else {
            // console.log(body)
            const data = JSON.parse(body);
            return res.status(200).json(data)
        }
    })
}

export const getTmdbSearchMovie = (req, res, body) => {
    // console.log(req.params.query)
    const keyword = req.params.query
        // return res.status(200).json(req.params.query)
    request(TMDB_URL + "search/movie?api_key=" + TMDB_APIKEY + "&language=en-US&page=1&include_adult=false&query=" + keyword, (error, response, body) => {
        if (error) {
            console.log(error);
        } else {
            // console.log(body)
            const data = JSON.parse(body);
            // console.log(data)
            return res.status(200).json(data)
        }
    })
}

export const getTmdbMovieInfoById = (req, res, body) => {
    console.log(req.params.id)
    const movie_id = req.params.id
        // return res.status(200).json(req.params.query)
    request(TMDB_URL + 'movie/' + movie_id + '?api_key=' + TMDB_APIKEY + "&language=en-US", (error, response, body) => {
        if (error) {
            console.log(error);
        } else {
            // console.log(body)
            const data = JSON.parse(body);
            // console.log(data)
            return res.status(200).json(data)
        }
    })
}


//감독 배우 확인
export const getTmdbMovieCreditsInfoById = (req, res) => {
    console.log(req.params.id)
    const movie_id = req.params.id
        // return res.status(200).json(req.params.query)
    request(TMDB_URL + 'movie/' + movie_id + '/credits' + '?api_key=' + TMDB_APIKEY + "&language=en-US", (error, response, body) => {
        if (error) {
            console.log(error);
        } else {
            // console.log(body)
            const data = JSON.parse(body);
            // console.log(data)
            return res.status(200).json(data)
        }
    })
}

export const createTmdbMovieInfo = async(req, res) => {

    const body = req.body;
    console.log(body.id)
    const data = await TmdbMovie.findOne({ id: body.id });
    console.log(data)

    if (data === null) {

        const tmdbMovieInfo = new TmdbMovie(body)
        tmdbMovieInfo.save()
        return res.status(200).json({ response: "save Success" })
    } else {
        console.log(data)
        return res.status(400).json({ response: "Duplicate" })
    }



    return res.status(200).json(body)
}