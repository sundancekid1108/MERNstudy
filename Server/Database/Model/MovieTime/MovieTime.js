const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MovieTimeSchema = new Schema({
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
    TheaterId: {
        type: Schema.Types.ObjectId,
        ref: 'Theater',
    },
}, { timestamps: true }, { versionKey: false }, );

const MovieTime = mongoose.model('MovieTime', MovieTimeSchema);

export default MovieTime;