import express from 'express';
import * as MovieApi from '../../Controller/Movie/MovieController';
import * as AuthJwt from '../../Middleware/authJwt';
const movieRouter = express.Router();

// movieRouter.post('/movies', AuthJwt.verifyToken, MovieApi.createMovie);
movieRouter.post('/movies', AuthJwt.verifyToken, MovieApi.createMovie);
movieRouter.get('/movieslist', AuthJwt.verifyToken, MovieApi.getMoviesList);
movieRouter.get('/movies/:id', MovieApi.getMovieInfo);
movieRouter.patch('/movies/:id', AuthJwt.verifyToken, MovieApi.updateMovieInfo);
movieRouter.delete('/movies/:id', AuthJwt.verifyToken, MovieApi.deleteMovie);
export default movieRouter;