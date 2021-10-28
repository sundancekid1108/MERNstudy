import express from 'express';
import * as MovieTimeApi from '../../Controller/MovieTime/MovieTime';
import * as AuthJwt from '../../Middleware/authJwt';
const movieTimeRouter = express.Router();

movieTimeRouter.post('/movietimes', MovieTimeApi.createMovieTime);
movieTimeRouter.get('/movietimes', MovieTimeApi.getMovieTimeList);
movieTimeRouter.get('/movietimes/:id', MovieTimeApi.getMovieTimeInfo);
movieTimeRouter.patch('/movietimes/:id', MovieTimeApi.updateMovieTimeInfo);
movieTimeRouter.delete('/movietimes/:id', MovieTimeApi.deleteMovieTime);

export default movieTimeRouter;