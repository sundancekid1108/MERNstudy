import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, Typography, Box } from '@material-ui/core';
import styles from './Styles';
import PublicNavbar from '../../../Layouts/Public/Components/Navbar/Navbar';
import MovieBanner from '../Components/MovieBanner/MovieBanner';
import MovieCarousel from '../Components/MovieCarousel/MovieCarousel';
import { getMoviesList } from '../../../Store/Actions/Index';

const MoviePage = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const movies = useSelector((state) => state.movies.movies);
  const latestMovies = useSelector((state) => state.movies.latestMovies);

  useEffect(() => {
    dispatch(getMoviesList());
  }, []);

  // console.log(movies, latestMovies);
  if (!movies) {
    return (
      <>
        <div className={classes.root}>
          <PublicNavbar />
          <div className={classes.content}>
            <Typography variant="h1">There are no movies available</Typography>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={classes.root}>
          <PublicNavbar />
          <MovieBanner movie={movies[0]} height="70vh" />
          <Box height={100} />
          <MovieCarousel
            carouselClass={classes.carousel}
            title="Latest Movies"
            to="/movie/category/latestmovies"
            movies={latestMovies}
          />
          <MovieCarousel
            carouselClass={classes.carousel}
            title="Popular Movies"
            movies={movies}
          />
          <MovieCarousel
            carouselClass={classes.carousel}
            title="Now Playing Movies"
            movies={movies}
          />
        </div>
      </>
    );
  }
};

MoviePage.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(MoviePage);
