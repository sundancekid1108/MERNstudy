import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

import Navbar from '../../../Layouts/Public/Components/Navbar/Navbar';
import styles from './Styles';

import * as MovieApi from '../../../Api/MovieApi/MovieApi';
import MovieBanner from '../Components/MovieBanner/MovieBanner';
import * as MovieAction from '../../../Store/Actions/MovieAction';

const MovieInfo = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();

  const params = useParams();
  const movieId = params.id

  const [movie, setMovie] = useState('');

  const getMovieInfo = async () => {
    try {
      const res = await MovieApi.getMovieInfo(movieId);
      const movieData = res.data;
      setMovie(movieData);
    } catch (error) {
      console.log('getMovieInfo', error);
    }
  };

  const getMovieInfoTest = () => {
    dispatch(MovieAction.getMovieInfo(movieId));
  }

  useEffect(() => {
    getMovieInfo();
    getMovieInfoTest();
    // console.log(movie);
  }, []);

  const movieInfo = useSelector((state) => state.movies.movieInfo);


  //왜 에러나는지 모르겠음..


  return (
    <>
      <div className={classes.root}>
        {/* <Navbar /> */}
        {movie && <MovieBanner movie={movie} description />}
      </div>
    </>
  );


};

MovieInfo.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieInfo);
