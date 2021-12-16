import ShowingMovieInfo from '../../Database/Model/ShowingMovieInfo/ShowingMovieInfo';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

//createShowingMovieInfo (영화시간표생성)
export const createShowingMovieInfo = async(req, res) => {
    const showingMovieInfo = new ShowingMovieInfo(req.body);
    try {
        await showingMovieInfo.save();
        res.status(201).json(showingMovieInfo);
    } catch (error) {
        res.status(400).json(error);
    }
};
//getShowingMovieInfosList(전체영화시간표조회)
export const getShowingMovieInfosList = async(req, res) => {
    try {
        const showingMovieInfoList = await ShowingMovieInfo.find({}, null, {
            sort: {
                _id: -1,
            },
        });
        res.satus(201).json(showingMovieInfoList);
    } catch (error) {
        res.status(400).json(error);
    }
};
//getShowingMovieInfo(특정영화시간표조회)
export const getShowingMovieInfo = async(req, res) => {
    const id = req.params.id;

    try {
        const showingMovieInfo = await ShowingMovieInfo.findById(id);
        if (showingMovieInfo) {
            res.satus(201).json(showingMovieInfo);
        } else {
            res.status(400).json({ response: 'NO ShowingMovieInfo' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
};
//updateShowingMovieInfo(영화시간표수정)
export const updateShowingMovieInfo = async(req, res) => {
    const id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['startAt', 'is3d', 'isImax'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) res.status(400).send({ error: 'update Fail' });

    try {
        const showingMovieInfo = await ShowingMovieInfo.findById(id);
        updates.forEach((update) => (showingMovieInfo[update] = req.body[update]));
        await showingMovieInfo.save();

        if (!showingMovieInfo) {
            res.status(400).json({ response: 'NO ShowingMovieInfo' });
        } else {
            res.satus(201).json(showingMovieInfo);
        }
    } catch (error) {
        res.status(400).json(error);
    }
};
//deleteShowingMovieInfo(영화시간표삭제)
export const deleteShowingMovieInfo = async(req, res) => {
    const id = req.params.id;

    try {
        const movieTicket = await ShowingMovieInfo.findByIdAndDelete({
            id: id,
        });
        if (!movieTicket) {
            return res
                .json({
                    response: 'No ShowingMovieInfo',
                })
                .status(404);
        } else {
            res.status(200).json({
                response: 'delete ShowingMovieInfo successfully',
            });
        }
    } catch (error) {
        res.status(400).json(error);
    }
};