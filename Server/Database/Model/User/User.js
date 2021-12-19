import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        default: '',
        unique: true,
    },

    profilePic: {
        type: String,
        default: '',
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        default: '',
    },

    phonenumber: {
        type: String,
        default: '',
    },

    firstname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        // required: true,
    },

    date: {
        type: Date,
        default: Date.now,
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }, ],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    }, ],

    isAdmin: {
        type: Boolean,
        default: false,
    },
    facebookLoginProvider: {
        type: {
            id: String,
            token: String,
        },
        select: false,
    },
    googleLoginProvider: {
        type: {
            id: String,
            token: String,
        },
        select: false,
    },
}, { timestamps: true }, { versionKey: false });

const User = mongoose.model('User', userSchema);
export default User;