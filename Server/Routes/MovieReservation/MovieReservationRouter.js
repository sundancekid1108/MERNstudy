import express from 'express';
import * as MovieReservationApi from '../../Controller/MovieReservation/MovieReservationController';
import * as AuthJwt from '../../Middleware/authJwt';
const movieReservationRouter = express.Router();

movieReservationRouter.post('/moviereservations', MovieReservationApi.createMovieReservation);

movieReservationRouter.get('/moviereservations', MovieReservationApi.getMovieReservationList);
movieReservationRouter.get('/usermoviereservations/:id', MovieReservationApi.getUserMovieReservationList)
movieReservationRouter.get('/moviereservations/:id', MovieReservationApi.getMovieReservationInfo);
movieReservationRouter.post('/moviereservations/:id', MovieReservationApi.updateMovieReservation);
movieReservationRouter.delete('/moviereservations/:id', MovieReservationApi.deleteMovieReservation);

export default movieReservationRouter;