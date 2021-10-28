import express from '../../node_modules/express';
import * as PostApi from '../../Controller/Post/PostController';
const globalRouter = express.Router();

globalRouter.get('/', (req, res) => {
    res.json({ response: 'Server is running' }).status(200);
});

globalRouter.get('/join', (req, res) => {
    res.json({ response: 'join' }).status(200);
});
globalRouter.get('/login', (req, res) => {
    res.json({ response: 'login' }).status(200);
});
globalRouter.get('/logout', (req, res) => {
    res.json({ response: 'logout' }).status(200);
});
globalRouter.get('/search', (req, res) => {
    res.json({ response: 'search' }).status(200);
});

export default globalRouter;