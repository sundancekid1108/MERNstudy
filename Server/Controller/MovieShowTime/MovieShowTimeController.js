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
        const data = await MovieShowTime.find({}, null, {
            sort: {
                _id: -1,
            },
        }).populate('movieId').populate('theaterId');
        return res.json(data).status(200);
    } catch (error) {
        return res.status(400).json(error);
    }
};

//getMovieShowTime(특정영화시간표조회)
export const getMovieShowTimeInfo = async(req, res) => {
    const id = req.params.id;

    try {
        const data = await MovieShowTime.findById(id).populate('movieId').populate('theaterId');
        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(400).json({ response: 'NO MovieShowTime' });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
};
//updateMovieShowTime(영화시간표수정)
export const updateMovieShowTime = async(req, res) => {
    const id = req.params.id;
    const body = req.body
    console.log(id)
    console.log(body)
    const updates = Object.keys(body);
    const allowedUpdates = [
        'movieId',
        'theaterId',
        'seats',
        'seatsAvailable',
        'startAt',
        'startDate',
        'endDate',
        'is3d',
        'isImax',
    ];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) res.status(400).json({ error: 'update Fail' });

    try {
        const movieShowTime = await MovieShowTime.findById(id);
        console.log(movieShowTime)
        updates.forEach((update) => (movieShowTime[update] = req.body[update]));
        await movieShowTime.save();

        if (!movieShowTime) {
            return res.status(400).json({ response: 'NO MovieShowTime' });
        } else {
            return res.status(200).json(movieShowTime);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
};
//deleteMovieShowTime(영화시간표삭제)
export const deleteMovieShowTime = async(req, res) => {
    const id = req.params.id;

    try {
        const data = await MovieShowTime.findByIdAndDelete({ _id: id });

        if (!data) {
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
        console.log(error);
        return res.status(400).json(error);
    }
};