import Comment from '../../Database/Model/Comment/Comment';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

exports.getCommentsList = (req, res) => {
  res.json({ response: 'getCommentsList' });
};

exports.getCommentDetail = (req, res) => {
  res.json({ response: 'getCommentDetail' });
};

exports.createComment = (req, res) => {
  res.json({ response: 'createComment' });
};

exports.editComment = (req, res) => {
  res.json({ response: 'editComment' });
};

exports.deleteComment = (req, res) => {
  res.json({ response: 'editComment' });
};
