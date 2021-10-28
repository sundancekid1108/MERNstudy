import MovieTime from '../../Database/Model/MovieTime/MovieTime';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

//createMovieTime (영화시간표생성)
export const createMovieTime = async(req, res) => {
    const movieTime = new MovieTime(req.body);
    try {
        await movieTime.save();
        res.status(201).json(movieTime);
    } catch (error) {
        res.status(400).json(error);
    }
};
//getMovieTimeList(전체영화시간표조회)
export const getMovieTimeList = async(req, res) => {
    try {
        const movieTimeList = await MovieTime.find({}, null, {
            sort: {
                _id: -1,
            },
        });
        res.satus(201).json(movieTimeList);
    } catch (error) {
        res.status(400).json(error);
    }
};
//getMovieTimeInfo(특정영화시간표조회)
export const getMovieTimeInfo = async(req, res) => {
    const movieTimeId = req.params.id;

    try {
        const movieTimeInfo = await MovieTime.findById(movieTimeId);
        if (movieTimeInfo) {
            res.satus(201).json(movieTimeInfo);
        } else {
            res.status(400).json({ response: 'NO MovieTimeInfo' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
};
//updateMovieTimeInfo(영화시간표수정)
export const updateMovieTimeInfo = async(req, res) => {
    const movieTimeId = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['startAt', 'is3d', 'isImax'];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update),
    );

    if (!isValidOperation) res.status(400).send({ error: 'update Fail' });

    try {
        const movieTime = await MovieTime.findById(movieTimeId);
        updates.forEach((update) => (movieTime[update] = req.body[update]));
        await movieTime.save();

        if (!movieTime) {
            res.status(400).json({ response: 'NO MovieTimeInfo' });
        } else {
            res.satus(201).json(movieTime);
        }
    } catch (error) {
        res.status(400).json(error);
    }
};
//deleteMovieTime(영화시간표삭제)
export const deleteMovieTime = async(req, res) => {
    const movieTimeId = req.params.id;

    try {
        const movieTime = await MovieTime.findByIdAndDelete({
            id: movieTimeId,
        });
        if (!movieTime) {
            return res
                .json({
                    response: 'No Movie Time Data',
                })
                .status(404);
        } else {
            res.status(200).json({
                response: 'delete Movie Time successfully',
            });
        }
    } catch (error) {
        res.status(400).json(error);
    }
};