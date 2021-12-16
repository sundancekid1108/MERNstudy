import express from 'express';
import * as ShowingMovieInfoApi from '../../Controller/ShowingMovieInfo/ShowingMovieInfo';
import * as AuthJwt from '../../Middleware/authJwt';
const showingMovieInfoRouter = express.Router();

showingMovieInfoRouter.post('/showingmovieinfos', ShowingMovieInfoApi.createShowingMovieInfo);
showingMovieInfoRouter.get('/showingmovieinfos', ShowingMovieInfoApi.getShowingMovieInfosList);
showingMovieInfoRouter.get('/showingmovieinfos/:id', ShowingMovieInfoApi.getShowingMovieInfo);
showingMovieInfoRouter.patch('/showingmovieinfos/:id', ShowingMovieInfoApi.updateShowingMovieInfo);
showingMovieInfoRouter.delete('/showingmovieinfos/:id', ShowingMovieInfoApi.deleteShowingMovieInfo);

export default showingMovieInfoRouter;