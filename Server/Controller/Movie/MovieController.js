import Movie from '../../Database/Model/Movie/Movie';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const { ObjectId } = mongoose.Types;

//createMovie(영화생성)
export const createMovie = async(req, res) => {
    const movieData = new Movie(req.body);
    try {
        await movieData.save();
        res.status(201).json(movieData);
    } catch (error) {
        res.status(400).json(error);
    }
};

//getMoviesList(영화리스트조회)
export const getMoviesList = async(req, res) => {
    try {
        const movieList = await Movie.find({}, null, {
            sort: {
                _id: -1,
            },
        });
        res.satus(201).json(movieList);
    } catch (error) {
        res.status(400).json(error);
    }
};

//getMovieInfoById(영화 정보 불러오기)
export const getMovieInfo = async(req, res) => {
    const movieId = req.params.id;
    try {
        const movieInfo = await Movie.findById(movieId);
        res.status(201).json(movieInfo);
    } catch (error) {
        res.status(400).json(error);
    }
};

//updateMovieById(영화 정보 업데이트)
export const updateMovieInfo = async(req, res) => {
    const movieId = req.params.id;
    const movieUpdates = Object.keys(req.body);
    const allowedUpdates = [
        'title',
        'language',
        'genre',
        'director',
        'cast',
        'description',
        'duration',
    ];
    const isValidOperation = movieUpdates.every((update) =>
        allowedUpdates.includes(update),
    );

    if (!isValidOperation) res.status(400).send({ error: 'Invalid updates!' });

    try {
        const movie = await Movie.findById(movieId);
        movieUpdates.forEach((update) => (movie[update] = req.body[update]));
        await movie.save();
        if (!movie) {
            res.status(404).json({ response: 'No Movie' });
        } else {
            res.status(200).json(movie);
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

//deleteMovieById(영화정보삭제)
export const deleteMovie = async(req, res) => {
    const movieId = req.params.id;
    try {
        const movie = await Movie.findByIdAndDelete({ id: movieId });
        if (!movie) {
            return res
                .json({
                    response: 'No Movie Data',
                })
                .status(404);
        } else {
            res.status(200).json({
                response: 'delete Movie successfully',
            });
        }
    } catch (error) {
        res.status(400).json(error);
    }
};