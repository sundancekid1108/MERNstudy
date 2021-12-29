import Theater from '../../Database/Model/Theater/Theater';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const { ObjectId } = mongoose.Types;

//createTheater(극장생성)
export const createTheater = async(req, res) => {
    const theater = new Theater(req.body);
    try {
        await theater.save();
        return res.json(theater).status(200);
    } catch (error) {
        return res.status(400).json(error);
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
        console.log(theaterList);
        return res.json(theaterList).status(200);
    } catch (error) {
        return res.status(400).json(error);
    }
};
//getTheaterInfoById(극장정보조회)
export const getTheaterInfo = async(req, res) => {
    const theaterId = req.params.id;
    try {
        const theaterInfo = await Theater.findById(theaterId);
        return res.json(theaterInfo).status(200);
    } catch (error) {
        return res.status(400).json(error);
    }
};
//updateTheaterInfo(극장정보업데이트)
export const updateTheaterInfo = async(req, res) => {
    const theaterId = req.params.id;

    const theaterUpdates = Object.keys(req.body);
    console.log(theaterUpdates);
    const allowedUpdates = ['name', 'ticketPrice', 'city', 'seats', 'seatsAvailable'];
    const isValidOperation = theaterUpdates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' });
    }

    try {
        const theaterData = await Theater.findById(theaterId);
        theaterUpdates.forEach((update) => (theaterData[update] = req.body[update]));
        await theaterData.save();
        if (!theaterData) {
            return res.status(404).json({ error: 'No theater Info' });
        } else {
            return res.json(theaterData).status(200);
        }
    } catch (error) {
        return res.status(400).json(error);
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
            return res.status(200).json({
                response: 'delete Theater successfully',
            });
        }
    } catch (error) {
        return res.status(400).json(error);
    }
};