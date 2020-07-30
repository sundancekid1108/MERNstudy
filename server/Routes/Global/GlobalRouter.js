const express = require('express');
const globalRouter = express.Router();
const { getPostList } = require('../../Controller/Post/PostController');

globalRouter.get('/', getPostList);

globalRouter.get('/join', (req, res) => {
  res.send({ response: 'join' }).status(200);
});
globalRouter.get('/login', (req, res) => {
  res.send({ response: 'login' }).status(200);
});
globalRouter.get('/logout', (req, res) => {
  res.send({ response: 'logout' }).status(200);
});
globalRouter.get('/search', (req, res) => {
  res.send({ response: 'search' }).status(200);
});

module.exports = globalRouter;
