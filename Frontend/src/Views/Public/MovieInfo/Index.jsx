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
import styles from './Styles';

import * as MovieApi from '../../../Api/MovieApi/MovieApi';
import textTruncate from '../../../Utils/TextTruncate/Index';
import MovieOverview from './Components/MovieOverview/Index';

//별점
const StyledRating = withStyles({
  iconFilled: {
    color: '#fff'
  },
  iconEmpty: {
    color: '#fff'
  }
})(Rating);

const MovieInfo = (props) => {
  // console.log('MovieInfo Props', props.match.params.id);
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
        {movie && (
          <Paper className={classes.movieInfo} elevation={20}>
            <div className={classes.infoSection}>
              <header className={classes.movieHeader}>
                <Box mb={3} display="flex" alignItems="center" flexWrap="wrap">
                  <Typography
                    className={classes.tag}
                    variant="body1"
                    color="inherit">
                    {movie.genre}
                  </Typography>
                  <Typography
                    className={classes.tag}
                    variant="body1"
                    color="inherit">
                    {movie.genre}
                  </Typography>
                  <Typography
                    className={classes.tag}
                    variant="body1"
                    color="inherit">
                    {movie.genre}
                  </Typography>
                  <StyledRating
                    value={4}
                    readOnly
                    size="small"
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  />
                </Box>
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
                  {textTruncate(movie.description, 450)}
                </Typography>
                <Typography
                  className={classes.director}
                  variant="h4"
                  color="inherit">
                  By: {movie.director}
                </Typography>
                <Typography
                  className={classes.duration}
                  variant="body1"
                  color="inherit">
                  {movie.duration} min
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
                backgroundImage: `url(${movie.image})`
              }}
            />

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
            <div className={classes.movieActions}>
              <Button className={classnames(classes.button, classes.learnMore)}>
                Learn More
                <ArrowRightAlt className={classes.buttonIcon} />
              </Button>
              <Link
                to={`moviereservation/${movie._id}`}
                style={{ textDecoration: 'none' }}>
                <Button variant="contained" className={classes.button}>
                  Buy Tickets
                  <ArrowRightAlt className={classes.buttonIcon} />
                </Button>
              </Link>
            </div>
          </Paper>
        )}

        {false && (
          <>
            <Tabs indicatorColor="primary" textColor="primary" centered>
              <Tab label="Overview" />
              <Tab label="Videos" />
              <Tab label="Booking" />
            </Tabs>
            <Container>
              <MovieOverview
                title={movie.title}
                movie={movie.description}
                image={movie.image}
              />
            </Container>
          </>
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
