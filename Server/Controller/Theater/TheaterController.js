import Theater from '../../Database/Model/Theater/Theater';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const { ObjectId } = mongoose.Types;

//createTheater(극장생성)
export const createTheater = async(req, res) => {
    const theater = new Theater(req.body);
    try {
        await Theater.save();
        res.status(201).json(theater);
    } catch (error) {
        res.status(400).json(error);
    }
};
//getTheaterList(극장리스트조회)
export const getTheaterList = async(req, res) => {
    try {
        const theaterList = await Theater.find({}, null, {
            sort: {
                _id: -1,
            },
        });
        res.satus(201).json(theaterList);
    } catch (error) {
        res.status(400).json(error);
    }
};
//getTheaterInfoById(극장정보조회)
export const getTheaterInfo = async(req, res) => {
    const theaterId = req.params.id;
    try {
        const theaterInfo = await Theater.findById(theaterId);
        res.status(201).json(theaterInfo);
    } catch (error) {
        res.status(400).json(error);
    }
};
//updateTheaterInfo(극장정보업데이트)
export const updateTheaterInfo = async(req, res) => {
    const theaterId = req.params.id;
    const theaterUpdates = Object.keys(req.body);
    const allowedUpdates = [
        'name',
        'ticketPrice',
        'city',
        'seats',
        'seatsAvailable',
    ];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update),
    );

    if (!isValidOperation) res.status(400).json({ error: 'Invalid updates!' });

    try {} catch (error) {
        res.status(400).json(error);
    }
};
//deleteTheaterById(극장정보삭제)
export const deleteTheater = async(req, res) => {
    const theaterId = req.params.id;
    try {
        const theater = await Theater.findByIdAndDelete({ id: theaterId });
        if (!theater) {
            return res
                .json({
                    response: 'No Theater Data',
                })
                .status(404);
        } else {
            res.status(200).json({
                response: 'delete Theater successfully',
            });
        }
    } catch (error) {
        res.status(400).json(error);
    }
};