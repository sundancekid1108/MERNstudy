import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles, Container, Typography, Button } from '@material-ui/core';
import styles from './Styles';
import PublicNavbar from '../../../Layouts/Public/Components/Navbar/Index';
import * as MovieApi from '../../../Api/MovieApi/MovieApi';
const MovieInfo = (props) => {
  // console.log('MovieInfo Props', props.match.params.id);
  const { classes } = props;
  const [movie, setMovie] = useState('');
  const backgroundImage =
    'https://image.tmdb.org/t/p/original/dihW2yTsvQlust7mSuAqJDtqW7k.jpg';

  const movieId = props.match.params.id;

  const getMovieInfo = async () => {
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
        {movie && (
          <section className={classes.heroSection}>
            <Container className={classes.container}>
              <div className={classes.backdrop} />
              <div
                className={classes.background}
                style={{
                  backgroundImage: `url(${movie.image})`
                }}
              />
              <img style={{ display: 'none' }} src={movie.image} alt="" />
              <Typography
                color="inherit"
                align="center"
                variant="h2"
                marked="center">
                {movie.title}
              </Typography>
              <Typography
                color="inherit"
                align="center"
                variant="h5"
                className={classes.h5}>
                {movie.description}
              </Typography>

              <Typography
                variant="body2"
                color="inherit"
                className={classes.more}>
                Discover the experience
              </Typography>
            </Container>
          </section>
        )}
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
