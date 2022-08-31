import express from 'express';
import * as MovieApi from '../../Controller/Movie/MovieController';
import * as AuthJwt from '../../Middleware/authJwt';
import * as TmdbMovieApi from '../../Controller/Tmdb/TmdbController'
const movieRouter = express.Router();


movieRouter.post('/movies', AuthJwt.verifyToken, MovieApi.createMovie);
movieRouter.get('/movielist', MovieApi.getMovieList);
movieRouter.get('/movieinfo/:id', MovieApi.getMovieInfo);
movieRouter.post('/movieinfo/:id', AuthJwt.verifyToken, MovieApi.updateMovieInfo);
movieRouter.delete('/movieinfo/:id', AuthJwt.verifyToken, MovieApi.deleteMovie);


movieRouter.get('/tmdbmovielist', AuthJwt.verifyToken, TmdbMovieApi.tmdbGetUpcomingMovieList);
movieRouter.get('/tmdbmovielist/savetmdbmovielist', AuthJwt.verifyToken, TmdbMovieApi.getTmdbMovieList);
movieRouter.get('/tmdbmovielist/:query', AuthJwt.verifyToken, TmdbMovieApi.getTmdbSearchMovie);
movieRouter.get('/tmdbmovieinfo/:id', AuthJwt.verifyToken, TmdbMovieApi.getTmdbMovieInfoById);
movieRouter.get('/tmdbmoviecredits/:id', AuthJwt.verifyToken, TmdbMovieApi.getTmdbMovieCreditsInfoById);
movieRouter.delete('/tmdbmovieinfo/:id', AuthJwt.verifyToken, TmdbMovieApi.deleteTmdbMovieInfo);
movieRouter.post('/tmdbmovies', AuthJwt.verifyToken, TmdbMovieApi.createTmdbMovieInfo)

export default movieRouter;