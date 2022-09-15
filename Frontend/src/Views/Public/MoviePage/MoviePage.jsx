import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, Typography, Box, Grid } from '@material-ui/core';
import styles from './Styles';
import PublicNavbar from '../../../Layouts/Public/Components/Navbar/Navbar';
import MovieBanner from '../Components/MovieBanner/MovieBanner';
import MovieCarousel from '../Components/MovieCarousel/MovieCarousel';
import Footer from '../../../Layouts/Dashboard/Components/Footer/Footer'
import * as MovieAction from '../../../Store/Actions/MovieAction';


const MoviePage = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const movies = useSelector((state) => state.movies.movies);
  const latestMovies = useSelector((state) => state.movies.latestMovies);
  const nowShowingMovies = useSelector((state) => state.movies.nowShowing);
  const comingSoonMovies = useSelector((state) => state.movies.comingSoon);

  const getMovieList = () => {
    dispatch(MovieAction.getMovieList());
  };

  useEffect(() => {
    getMovieList();
  }, []);

  // console.log('movies', movies)
  // console.log('nowShowingMovies', nowShowingMovies);
  // console.log('comingSoonMovies', comingSoonMovies);

  if (!movies) {
    return (
      <>
        <div className={classes.root}>
          {/* <PublicNavbar /> */}
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
          {/* <PublicNavbar /> */}
          <MovieBanner movie={movies[0]} height="70vh" />
          <Box height={100} />

          <MovieCarousel
            carouselClass={classes.carousel}
            title="Now Showing"
            to="/movie/category/nowShowing"
            movies={nowShowingMovies}
          />
          <MovieCarousel
            carouselClass={classes.carousel}
            title="Coming Soon"
            to="/movie/category/comingSoon"
            movies={comingSoonMovies}
          />
        </div>

      </>
    );
  }
};

MoviePage.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MoviePage);
