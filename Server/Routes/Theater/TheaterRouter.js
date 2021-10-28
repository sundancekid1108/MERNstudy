import express from 'express';
import * as TheaterApi from '../../Controller/Theater/TheaterController';
import * as AuthJwt from '../../Middleware/authJwt';
const theaterRouter = express.Router();

theaterRouter.post('/theaters', TheaterApi.createTheater);
theaterRouter.get('/theaters', TheaterApi.getTheaterList);
theaterRouter.get('/theaters/:id', TheaterApi.getTheaterInfo);
theaterRouter.patch('/theaters/:id', TheaterApi.updateTheaterInfo);
theaterRouter.delete('/theaters/:id', TheaterApi.deleteTheater);
export default theaterRouter;