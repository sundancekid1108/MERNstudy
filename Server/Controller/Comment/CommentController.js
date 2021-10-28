import Comment from '../../Database/Model/Comment/Comment';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

export const getCommentsList = (req, res) => {
    res.json({ response: 'getCommentsList' });
};

export const getCommentDetail = (req, res) => {
    res.json({ response: 'getCommentDetail' });
};

export const createComment = (req, res) => {
    res.json({ response: 'createComment' });
};

export const updateComment = (req, res) => {
    res.json({ response: 'updateComment' });
};

export const deleteComment = (req, res) => {
    res.json({ response: 'deleteComment' });
};
