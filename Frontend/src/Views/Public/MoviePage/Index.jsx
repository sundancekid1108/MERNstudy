import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import styles from './Styles';
import PublicNavbar from '../../../Layouts/Public/Components/Navbar/Index';
import NewMoviesList from './Components/NewMoviesList/Index';
import TotalMoviesList from './Components/TotalMoviesList/Index';

import MovieCarousel from './Components/MovieCarousel/Index';

import * as MovieApi from '../../../Api/MovieApi/MovieApi';
import { useDispatch, useSelector } from 'react-redux';

const MoviePage = (props) => {
  const { classes } = props;
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const authTest = useSelector((state) => state.auth);

  const [movies, setMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);
  const [isAuthed, setIsAuthed] = useState(null);

  const getMovies = async () => {
    try {
      const res = await MovieApi.getMoviesList();
      const fetchedMoviesList = res.data;
      const allMovies = fetchedMoviesList;
      setMovies(allMovies);
      const newMovieData = fetchedMoviesList
        .sort((a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate))
        .slice(0, 5);
      // console.log('movieData : ', movieData);
      setNewMovies(newMovieData);
    } catch (error) {
      console.log('MoviesListError', error);
    }
  };

  useEffect(() => {
    getMovies();
    setIsAuthed(authTest);
  }, []);

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
          <PublicNavbar isAuthed={isAuthed} />
          <NewMoviesList movies={newMovies} />
          <MovieCarousel
            carouselClass={classes.carousel}
            title="Latest Movies"
            movies={movies}
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

          <TotalMoviesList movies={movies} />
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
