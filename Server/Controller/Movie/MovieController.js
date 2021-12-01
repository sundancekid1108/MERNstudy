import Movie from '../../Database/Model/Movie/Movie';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const { ObjectId } = mongoose.Types;

//createMovie(영화생성)
export const createMovie = async(req, res) => {
    const isAdmin = req.decodedUser.isAdmin;
    if (isAdmin == false) {
        return res.status(400).json({ response: 'Unauthorized You are not Admin' });
    } else {
        const movieData = new Movie(req.body);
        console.log('createMovie MovieData :', movieData);
        try {
            await movieData.save();
            return res.status(201).json(movieData);
        } catch (error) {
            return res.status(400).json(error);
        }
    }
};

//getMoviesList(영화리스트조회)
export const getMoviesList = async(req, res) => {
    const isAdmin = req.decodedUser.isAdmin;
    if (isAdmin == false) {
        return res.status(400).json({ response: 'Unauthorized You are not Admin' });
    } else {
        try {
            const movieList = await Movie.find({}, null, {
                sort: {
                    _id: -1,
                },
            });
            console.log('movieList', movieList);
            return res.json(movieList).status(200);
        } catch (err) {
            console.log(err);
            return res.json({
                response: 'getMovieList Error',
            });
        }
    }
};

//getMovieInfoById(영화 정보 불러오기)
export const getMovieInfo = async(req, res) => {
    const isAdmin = req.decodedUser.isAdmin;
    if (isAdmin == false) {
        return res.status(400).json({ response: 'Unauthorized You are not Admin' });
    } else {
        const movieId = req.params.id;
        try {
            const movie = await Movie.findById(movieId);
            // console.log(movie);
            return res.status(201).json(movie);
        } catch (error) {
            return res.status(400).json(error);
        }
    }
};

//updateMovieById(영화 정보 업데이트)
export const updateMovieInfo = async(req, res) => {
    const isAdmin = req.decodedUser.isAdmin;
    if (isAdmin == false) {
        return res.status(400).json({ response: 'Unauthorized You are not Admin' });
    } else {
        const movieId = req.params.id;
        const movieUpdates = Object.keys(req.body);
        const allowedUpdates = [
            'title',
            'image',
            'genre',
            'language',
            'duration',
            'description',
            'director',
            'cast',
            'releaseDate',
            'endDate',
        ];
        const isValidOperation = movieUpdates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' });
        }

        try {
            const movie = await Movie.findById(movieId);
            movieUpdates.forEach((update) => (movie[update] = req.body[update]));
            await movie.save();
            if (!movie) {
                return res.status(404).json({ response: 'No Movie' });
            } else {
                return res.status(200).json(movie);
            }
        } catch (error) {
            return res.status(400).json(error);
        }
    }
};

//deleteMovieById(영화정보삭제)
export const deleteMovie = async(req, res) => {
    const isAdmin = req.decodedUser.isAdmin;
    if (isAdmin == false) {
        return res.status(400).json({ response: 'Unauthorized You are not Admin' });
    } else {
        const movieId = req.params.id;
        try {
            const movie = await Movie.findByIdAndDelete({ _id: movieId });
            if (!movie) {
                return res
                    .json({
                        response: 'No Movie Data',
                    })
                    .status(404);
            } else {
                return res.status(200).json({
                    response: 'delete Movie successfully',
                });
            }
        } catch (error) {
            return res.status(400).json(error);
        }
    }
};