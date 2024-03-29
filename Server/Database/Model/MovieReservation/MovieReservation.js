const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const movieReservationSchema = new Schema({
    date: {
        type: Date,
        // required: true,
    },
    startAt: {
        type: Date,
        // required: true,
        trim: true,
    },
    seats: {
        type: [Schema.Types.Mixed],
        // required: true,
    },
    ticketPrice: {
        type: Number,
        // required: true,
    },
    totalPrice: {
        type: Number,
        // required: true,
    },
    movieId: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
    },
    theaterId: {
        type: Schema.Types.ObjectId,
        ref: 'Theater',
        required: true,
    },
    username: {
        type: String,
        // required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    phonenumber: {
        type: String,
        // required: true,
    },
    checkin: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true }, { versionKey: false });

const MovieReservation = mongoose.model('MovieReservation', movieReservationSchema);
export default MovieReservation;