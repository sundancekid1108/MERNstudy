import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Rating } from '@material-ui/lab';
import {
  Box,
  Typography,
  Paper,
  Button,
  makeStyles,
  withStyles
} from '@material-ui/core';
import textTruncate from '../../../../Utils/TextTruncate/TextTruncate';
import { Link } from 'react-router-dom';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import styles from './Styles';

const StyledRating = withStyles({
  iconFilled: {
    color: '#fff'
  },
  iconEmpty: {
    color: '#fff'
  }
})(Rating);

const MovieBanner = (props) => {
  const { classes, movie, description } = props;
  const params = useParams()
  // console.log("MovieBanner Props", props)
  // console.log(movie.genres)

  // console.log(params)

  if (!movie) {
    return (
      <>
        <div>No Movie</div>
      </>
    );
  } else {
    return (
      <>
        <Paper className={classes.movieHero} elevation={20}>
          <div className={classes.infoSection}>
            <header className={classes.movieHeader}>
              {description && (
                <Box mb={3} display="flex" alignItems="center" flexWrap="wrap">
                  {movie.genres.map((genre, id) => (
                    <Typography
                      className={classes.tag}
                      key={genre.id}
                      variant="body1"
                      color="inherit">
                      {genre.name}
                    </Typography>
                  ))}




                  <StyledRating
                    value={4}
                    readOnly
                    size="small"
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  />
                </Box>
              )}
              <Typography
                className={classes.movieTitle}
                variant="h1"
                color="inherit">
                {movie.title}
              </Typography>
              <Typography
                className={classes.descriptionText}
                variant="body1"
                color="inherit">
                {textTruncate(movie.overview, 450)}
              </Typography>
              <Typography
                className={classes.director}
                variant="h4"
                color="inherit">
                By: {movie.crew.filter(({ job }) => job === "Director")[0].name}

              </Typography>
              <Typography
                className={classes.duration}
                variant="body1"
                color="inherit">
                {movie.runtime} min
              </Typography>
              <Typography
                className={classes.genre}
                variant="body1"
                color="inherit">
                {movie.genre}
              </Typography>
            </header>
          </div>
          <div
            className={classes.blurBackground}
            style={{
              backgroundImage: `url(${"https://image.tmdb.org/t/p/original/" + movie.poster_path})`
            }}
          />
          <div className={classes.movieActions}>
            {description ? (
              <Link
                to={`/movie/moviereservation/${movie._id}`}
                style={{ textDecoration: 'none' }}>
                <Button variant="contained" className={classes.button}>
                  Buy Tickets
                  <ArrowRightAlt className={classes.buttonIcon} />
                </Button>
              </Link>
            ) : (
              <Link
                to={`/movie/${movie._id}`}
                style={{ textDecoration: 'none' }}>
                <Button
                  className={classnames(classes.button, classes.learnMore)}>
                  Learn More
                  <ArrowRightAlt className={classes.buttonIcon} />
                </Button>
              </Link>
            )}
          </div>
        </Paper>
      </>
    );
  }
};

MovieBanner.propTypes = {
  movie: PropTypes.object
};

export default withStyles(styles)(MovieBanner);
