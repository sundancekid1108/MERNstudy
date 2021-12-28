import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  withStyles,
  Container,
  CircularProgress,
  Grid,
  Typography
} from '@material-ui/core';
import styles from './Styles';
import PublicNavbar from '../../../Layouts/Public/Components/Navbar/Index';
import NewMoviesList from './Components/NewMoviesList/Index';
import TotalMoviesList from './Components/TotalMoviesList/Index';
import MovieBanner from '../MovieBanner/Index';
import MovieCarousel from './Components/MovieCarousel/Index';
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
          <Container maxWidth="xl">
            <MovieCarousel
              carouselClass={classes.carousel}
              title="Latest Movies"
              to="/movie/category/latest"
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
          </Container>
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
