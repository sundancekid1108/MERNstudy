import express from 'express';
import * as MovieShowTimeApi from '../../Controller/MovieShowTime/MovieShowTimeController';
import * as AuthJwt from '../../Middleware/authJwt';
const movieShowTimeRouter = express.Router();

movieShowTimeRouter.post('/movieshowtime', MovieShowTimeApi.createMovieShowTime);
movieShowTimeRouter.get('/movieshowtime', MovieShowTimeApi.getMovieShowTimesList);
movieShowTimeRouter.get('/movieshowtime/:id', MovieShowTimeApi.getMovieShowTimeInfo);
movieShowTimeRouter.patch('/movieshowtime/:id', MovieShowTimeApi.updateMovieShowTime);
movieShowTimeRouter.delete('/movieshowtime/:id', MovieShowTimeApi.deleteMovieShowTime);

export default movieShowTimeRouter;