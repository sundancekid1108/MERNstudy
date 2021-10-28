import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TheatherSchema = new Schema({
    name: {
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
}, { timestamps: true }, { versionKey: false }, );

const Theather = mongoose.model('Theather', TheatherSchema);
export default Theather;