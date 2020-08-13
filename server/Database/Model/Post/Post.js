import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      default: '',
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    contents: {
      type: String,
      required: true,
      default: '',
    },
    fileURL: {
      type: String,
      default: '',
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
  },
  { timestamps: true },
  { versionKey: false },
);

// PostSchema.methods('toJSON', () => {});s

const Post = mongoose.model('Post', PostSchema);

export default Post;
