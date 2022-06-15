import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TheaterSchema = new Schema({
    theaterName: {
        type: String,
        required: true,
        trim: true,
    },
    ticketPrice: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    seats: {
        type: [Schema.Types.Mixed],
        required: true,
    },
    seatsAvailable: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
}, { timestamps: true }, { versionKey: false });

const Theater = mongoose.model('Theater', TheaterSchema);
export default Theater;