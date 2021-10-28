import express from 'express';
import * as MovieApi from '../../Controller/Movie/MovieController';
import * as AuthJwt from '../../Middleware/authJwt';
const movieRouter = express.Router();

movieRouter.post('/movies', MovieApi.createMovie);
movieRouter.get('/movies', MovieApi.getMoviesList);
movieRouter.get('/movies/:id', MovieApi.getMovieInfo);
movieRouter.patch('/movies/:id', MovieApi.updateMovieInfo);
movieRouter.delete('/movies/:id', MovieApi.deleteMovie);
export default movieRouter;