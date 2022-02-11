import MovieShowTime from '../../Database/Model/MovieShowTime/MovieShowTime';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

//createMovieShowTime (영화시간표생성)
export const createMovieShowTime = async(req, res) => {
    const movieShowTime = new MovieShowTime(req.body);
    try {
        await movieShowTime.save();
        return res.status(200).json(movieShowTime);
    } catch (error) {
        return res.status(400).json(error);
    }
};
//getMovieShowTimesList(전체영화시간표조회)
export const getMovieShowTimesList = async(req, res) => {
    try {
        const movieShowTimeList = await MovieShowTime.find({}, null, {
            sort: {
                _id: -1,
            },
        });
        console.log(movieShowTimeList);
        return res.json(movieShowTimeList).status(200);
    } catch (error) {
        return res.status(400).json(error);
    }
};

//getMovieShowTime(특정영화시간표조회)
export const getMovieShowTimeInfo = async(req, res) => {
    const id = req.params.id;

    try {
        const MovieShowTime = await MovieShowTime.findById(id);
        if (MovieShowTime) {
            return res.json(MovieShowTime).satus(200);
        } else {
            return res.json({ response: 'NO MovieShowTime' }).status(400);
        }
    } catch (error) {
        return res.json(error).status(400);
    }
};
//updateMovieShowTime(영화시간표수정)
export const updateMovieShowTime = async(req, res) => {
    const id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['startAt', 'is3d', 'isImax'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) res.status(400).json({ error: 'update Fail' });

    try {
        const MovieShowTime = await MovieShowTime.findById(id);
        updates.forEach((update) => (MovieShowTime[update] = req.body[update]));
        await MovieShowTime.save();

        if (!MovieShowTime) {
            return res.status(400).json({ response: 'NO MovieShowTime' });
        } else {
            return res.satus(200).json(MovieShowTime);
        }
    } catch (error) {
        return res.status(400).json(error);
    }
};
//deleteMovieShowTime(영화시간표삭제)
export const deleteMovieShowTime = async(req, res) => {
    const id = req.params.id;

    try {
        const MovieShowTime = await MovieShowTime.findByIdAndDelete({
            id: id,
        });
        if (!MovieShowTime) {
            return res
                .json({
                    response: 'No MovieShowTime',
                })
                .status(404);
        } else {
            return res.status(200).json({
                response: 'delete MovieShowTime successfully',
            });
        }
    } catch (error) {
        return res.status(400).json(error);
    }
};