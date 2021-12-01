import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles, Typography } from '@material-ui/core';
import textTruncate from '../../../../../Utils/TextTruncate/Index';
import styles from './Styles';

const MovieCard = (props) => {
  const { classes, movie } = props;
  console.log('MovieCard movie', movie);
  return (
    <>
      <Link to={`movie/${movie._id}`} style={{ textDecoration: 'none' }}>
        <div className={classes.card}>
          <header
            className={classes.header}
            style={{
              backgroundImage: `url(${movie.image})`
            }}>
            <Typography className={classes.h4} variant="h4" color="inherit">
              {movie.genre}
            </Typography>
          </header>
          <div className={classes.body}>
            <h2>{movie.title}</h2>
            <h2>{movie.director}</h2>
            <p>{movie.language}</p>
            <p>{movie.cast}</p>
            <p>{movie.duration}</p>
            <p>{textTruncate(movie.description)}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieCard);
