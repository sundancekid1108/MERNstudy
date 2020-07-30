const express = require('express');
const postRouter = express.Router();

const {
  getPostList,
  createPost,
  editPost,
  deletePost,
} = require('../../Controller/Post/PostController');

postRouter.get('/', getPostList);

postRouter.post('/', createPost);

// postRouter.post('/', (req, res) => {
//   res.send({ response: 'createPost test' }).status(200);
// });

postRouter.get('/upload', (req, res) => {
  res.send({ response: 'upload' }).status(200);
});

postRouter.get('/editpost', editPost);

postRouter.get('/deletepost', deletePost);

module.exports = postRouter;
