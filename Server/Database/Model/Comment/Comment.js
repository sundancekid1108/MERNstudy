import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    text: {
        type: String,
        required: 'Text is required',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    updatedAt: {
        type: Date,
    },

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
}, {
    versionKey: false,
}, );

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;