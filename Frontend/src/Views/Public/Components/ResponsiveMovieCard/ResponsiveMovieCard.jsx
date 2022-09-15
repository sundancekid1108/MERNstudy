import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CaledarIcon from '@material-ui/icons/CalendarToday';
import textTruncate from '../../../../Utils/TextTruncate/TextTruncate';
import styles from './Styles';

const ResponsiveMovieCard = (props) => {
  const { classes, movie } = props;



  // console.log("ResponsiveMovieCard props", props)
  return (
    <>
      <Link to={`/movie/${movie._id}`} style={{ textDecoration: 'none' }}>
        <Paper className={classes.movieCard} elevation={20}>
          <div className={classes.infoSection}>
            <header className={classes.movieHeader}>
              <Typography
                className={classes.movieTitle}
                variant="h3"
                color="inherit">
                {movie.title}
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

              {movie.genres.map((genre, id) => (
                <Typography
                  key={id}
                  className={classes.genre}
                  variant="body1"
                  color="inherit">
                  {genre.name}
                </Typography>
              ))}

            </header>

            <div className={classes.description}>
              <Typography
                className={classes.descriptionText}
                variant="body1"
                color="inherit">
                {textTruncate(movie.overview, 250)}
              </Typography>
            </div>
            <div className={classes.footer}>
              <div className={classes.icons}>
                <ShareIcon fontSize="small" />
              </div>
              <div className={classes.icons}>
                <FavoriteIcon fontSize="small" />
              </div>
              <div className={classes.icons}>
                <CaledarIcon fontSize="small" />
              </div>
            </div>
          </div>
          <div
            className={classes.blurBackground}
            style={{
              backgroundImage: `url(${"https://image.tmdb.org/t/p/original/" + movie.poster_path})`
            }}
          />
        </Paper>
      </Link>
    </>
  );
};

ResponsiveMovieCard.propTypes = {
  movie: PropTypes.object.isRequired
};
export default withStyles(styles)(ResponsiveMovieCard);
