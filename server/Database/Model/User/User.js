import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
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
      default: '',
    },

    password: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  { timestamps: true },
  { versionKey: false },
);

const User = mongoose.model('User', UserSchema);
export default User;
