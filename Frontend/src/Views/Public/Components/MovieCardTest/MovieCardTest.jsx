import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import textTruncate from '../../../../Utils/TextTruncate/TextTruncate';
import styles from './Styles';

const MovieCardTest = (props) => {
  const { classes, movie } = props;
  console.log("MovieCardTest props", props)
  return (
    <>
      <Link to={`movie/${movie._id}`} style={{ textDecoration: 'none' }}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={"https://image.tmdb.org/t/p/original/" + movie.poster_path}
              title={movie.title}
            />
            <CardContent>
              <Typography
                className={classes.h5}
                gutterBottom
                variant="h5"
                component="h2"
                color="inherit">
                {movie.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </>
  );
};

MovieCardTest.propTypes = {
  movie: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieCardTest);
