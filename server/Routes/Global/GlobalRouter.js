import express from '../../node_modules/express';
import * as PostApi from '../../Controller/Post/PostController';
const globalRouter = express.Router();

globalRouter.get('/', (req, res) => {
  res.send({ response: 'Server is on' }).status(200);
});

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

export default globalRouter;
