import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Rating } from '@material-ui/lab';
import {
  Box,
  withStyles,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  Button
} from '@material-ui/core';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CaledarIcon from '@material-ui/icons/CalendarToday';

import PublicNavbar from '../../../Layouts/Public/Components/Navbar/Index';
// import MovieBanner from '../MovieBanner/Index';
import styles from './Styles';

import * as MovieApi from '../../../Api/MovieApi/MovieApi';
import textTruncate from '../../../Utils/TextTruncate/Index';
import MovieBanner from '../MovieBanner/Index';
import MovieOverview from './Components/MovieOverview/Index';

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
        <PublicNavbar />
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
