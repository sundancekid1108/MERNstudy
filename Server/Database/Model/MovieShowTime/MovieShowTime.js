const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const movieShowTimeSchema = new Schema({
    startAt: {
        type: String,
        required: true,
        trim: true,
    },
    is3d: {
        type: Boolean,
        default: false,
    },
    isImax: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    movieId: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
    },
    theaterId: {
        type: Schema.Types.ObjectId,
        ref: 'Theater',
    },
}, { timestamps: true }, { versionKey: false });

const MovieShowTime = mongoose.model('MovieShowTime', movieShowTimeSchema);

export default MovieShowTime;