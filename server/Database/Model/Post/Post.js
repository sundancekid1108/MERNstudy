const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      default: '',
    },
    author: {
      type: String,
    },
    contents: {
      type: String,
      required: true,
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
);

PostSchema.methods('toJSON', () => {});

const Post = mongoose.model('post', PostSchema);
export default Post;
