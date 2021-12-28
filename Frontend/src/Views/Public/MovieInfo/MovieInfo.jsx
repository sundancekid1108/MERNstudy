import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import Navbar from '../../../Layouts/Public/Components/Navbar/Navbar';
import styles from './Styles';

import * as MovieApi from '../../../Api/MovieApi/MovieApi';
import MovieBanner from '../Components/MovieBanner/MovieBanner';

const MovieInfo = (props) => {
  const { classes } = props;

  const [movie, setMovie] = useState('');

  const getMovieInfo = async () => {
    const movieId = props.match.params.id;
    try {
      const res = await MovieApi.getMovieInfo(movieId);
      const movieInfo = res.data;
      // console.log(movieInfo);
      setMovie(movieInfo);
    } catch (error) {
      console.log('getMovieInfo', error);
    }
  };

  useEffect(() => {
    getMovieInfo();
    // console.log(movie);
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Navbar />
        {movie && <MovieBanner movie={movie} description />}
      </div>
    </>
  );
};

MovieInfo.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieInfo);
