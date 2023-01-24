import MovieReservation from '../../Database/Model/MovieReservation/MovieReservation';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import * as createQRcode from '../../Utils/CreateQRcode'
dotenv.config();

const { ObjectId } = mongoose.Types;

//createMovieReservation (영화티켓생성)
export const createMovieReservation = async(req, res) => {
    const body = req.body;
    // console.log(body)
    const movieReservationData = new MovieReservation(body);
    const movieReservationQRCode = await createQRcode.createQR('http://localhost:3001/moviereservationqrcode/'+ movieReservationData._id)

    try {
        await movieReservationData.save();
        // return res.status(200).json(movieReservationData).send(movieReservationQRCode) ;
        return res.status(200).send({movieReservationData, movieReservationQRCode})
    } catch (error) {
        return res.status(400).json(error);
    }
};

//getMovieReservationList(영화티켓리스트조회)
export const getMovieReservationList = async(req, res) => {
    try {
        const movieReservationList = await MovieReservation.find({}, null, {
            sort: {
                _id: -1,
            },
        }).populate('movieId').populate('theaterId').populate('userId');
        return res.json(movieReservationList).status(200);
    } catch (error) {
        return res.json(error).status(400);
    }
};



export const getUserMovieReservationList = async(req, res) => {
    const id = req.params.id;
    console.log("getUserMovieReservationList id", id)
    try {
        const userMovieReservationList = await MovieReservation.find({
            userId: id,
        }).populate('movieId').populate('theaterId').populate('userId');
        // console.log(userMovieReservationList)
        return res.json(userMovieReservationList).status(200);
    } catch (error) {
        return res.status(400).json(error);
    }
    // 
}


//getMovieReservationInfo(영화티켓정보조회)
export const getMovieReservationInfo = async(req, res) => {
    const movieReservationId = req.params.id;
    try {
        const movieReservationInfo = await MovieReservation.findById(movieReservationId).populate('movieId').populate('theaterId');
        console.log(movieReservationInfo)
        if (movieReservationInfo) {
            return res.satus(200).json(movieReservationInfo);
        } else {
            return res.status(400).json({ response: 'NO MovieReservationInfo' });
        }
    } catch (error) {
        return res.status(400).json(error);
    }
};

//updateMovieReservation(영화티켓수정)
export const updateMovieReservation = async(req, res) => {
    const movieReservationId = req.params.id;
    const movieReservationUpdates = Object.keys(req.body);
    const allowedUpdates = ['date', 'startAt',  'seats', 'ticketPrice', 'totalPrice', 'movieId',  'theaterId', 'phonenumber',  'checkin'  ];
    const isValidOperation = movieReservationUpdates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).json({ error: 'update Fail' });
    }
    try {
        const movieReservation = await MovieReservation.findById(movieReservationId);
        movieReservationUpdates.forEach((update) => (movieReservation[update] = req.body[update]));
        await movieReservation.save();

        if (!movieReservation) {
            return res.status(400).json({ response: 'No MovieReservationInfo' });
        } else {
            return res.satus(200).json(movieReservation);
        }
    } catch (error) {
        return res.status(400).json(error);
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
            return res.status(404).json({
                response: 'No Movie Reservation Data',
            });
        } else {
            return res.status(200).json({
                response: 'delete Movie Reservation successfully',
            });
        }
    } catch (error) {
        return res.status(400).json(error);
    }
};