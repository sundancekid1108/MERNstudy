import MovieReservation from '../../Database/Model/MovieReservation/MovieReservation';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const { ObjectId } = mongoose.Types;

//createMovieReservation (영화티켓생성)
export const createMovieReservation = async(req, res) => {
    const movieReservationData = new MovieReservation(req.body);
    try {
        await movieReservationData.save();
        res.status(201).json(movieReservationData);
    } catch (error) {
        res.status(400).json(error);
    }
};

//getMovieReservationList(영화티켓리스트조회)
export const getMovieReservationList = async(req, res) => {
    try {
        const movieReservationList = await MovieReservation.find({}, null, {
            sort: {
                _id: -1,
            },
        });
        res.satus(201).json(movieReservationList);
    } catch (error) {
        res.status(400).json(error);
    }
};

//getMovieReservationInfo(영화티켓정보조회)
export const getMovieReservationInfo = async(req, res) => {
    const movieReservationId = req.params.id;
    try {
        const movieReservationInfo = await MovieReservation.findById(
            movieReservationId,
        );
        if (movieReservationInfo) {
            res.satus(201).json(movieReservationInfo);
        } else {
            return res
                .status(400)
                .json({ response: 'NO MovieReservationInfo' });
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

//updateMovieReservation(영화티켓수정)
export const updateMovieReservation = async(req, res) => {
    const movieReservationId = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['startAt', 'is3d', 'isImax'];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update),
    );

    if (!isValidOperation) res.status(400).send({ error: 'update Fail' });
    try {
        const movieReservation = await MovieReservation.findById(
            movieReservationId,
        );
        updates.forEach(
            (update) => (movieReservation[update] = req.body[update]),
        );
        await movieReservation.save();

        if (!movieReservation) {
            return res
                .status(400)
                .json({ response: 'NO MovieReservationInfo' });
        } else {
            res.satus(201).json(movieReservation);
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

//deleteMovieReservation(영화티켓삭제)
export const deleteMovieReservation = async(req, res) => {
    const movieReservationId = req.params.id;
    try {
        const movieReservation = await MovieReservation.findByIdAndDelete({
            id: movieReservationId,
        });
        if (!movieReservation) {
            res.status(404).json({
                response: 'No Movie Reservation Data',
            });
        } else {
            res.status(200).json({
                response: 'delete Movie Reservation successfully',
            });
        }
    } catch (error) {
        res.status(400).json(error);
    }
};