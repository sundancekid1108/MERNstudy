import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      default: '',
    },
    userName: {
      type: String,
      required: true,
      default: '',
      unique: true,
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
  },
  { timestamps: true },
  { versionKey: false },
);

const User = mongoose.model('User', UserSchema);
export default User;
