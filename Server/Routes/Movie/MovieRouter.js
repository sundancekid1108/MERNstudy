import express from 'express';
import * as MovieApi from '../../Controller/Movie/MovieController';
import * as AuthJwt from '../../Middleware/authJwt';
const movieRouter = express.Router();

// movieRouter.post('/movies', AuthJwt.verifyToken, MovieApi.createMovie);
movieRouter.post('/movies', AuthJwt.verifyToken, MovieApi.createMovie);
movieRouter.get('/movieslist', MovieApi.getMoviesList);
movieRouter.get('/movieinfo/:id', MovieApi.getMovieInfo);
movieRouter.patch('/movieinfo/:id', AuthJwt.verifyToken, MovieApi.updateMovieInfo);
movieRouter.delete('/movieinfo/:id', AuthJwt.verifyToken, MovieApi.deleteMovie);
export default movieRouter;