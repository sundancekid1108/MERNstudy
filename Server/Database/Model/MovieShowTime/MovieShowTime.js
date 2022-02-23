const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const movieShowTimeSchema = new Schema({
    movieId: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
    },
    theaterId: {
        type: Schema.Types.ObjectId,
        ref: 'Theater',
    },
    isImax: {
        type: Boolean,
        required: true,
        default: false,
    },
    is3d: {
        type: Boolean,
        required: true,
        default: false,
    },
    startAt: {
        type: Date,
        required: true,
        trim: true,
    },

    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
}, { timestamps: true }, { versionKey: false });

const MovieShowTime = mongoose.model('MovieShowTime', movieShowTimeSchema);

export default MovieShowTime;