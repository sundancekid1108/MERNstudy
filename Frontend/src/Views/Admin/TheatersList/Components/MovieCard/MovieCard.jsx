import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles, withStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { AccessTime as AccessTimeIcon } from '@material-ui/icons';
import { Paper } from '../../../../../Components/Index';

const MovieCard = (props) => {
  const { className, movie } = props;
  const rootClassName = classNames(classes.root, className);
  return (
    <>
      <Paper className={rootClassName}>
        <div className={classes.imageWrapper}>
          <img alt="movie" className={classes.image} src={movie.image} />
        </div>
        <div className={classes.details}>
          <Typography className={classes.title} variant="h4">
            {movie.title}
          </Typography>
          <Typography className={classes.description} variant="body1">
            {movie.description}
          </Typography>
        </div>
        <div className={classes.stats}>
          <AccessTimeIcon className={classes.updateIcon} />
          <Typography className={classes.updateText} variant="body2">
            {movie.duration} minutes
          </Typography>
        </div>
      </Paper>
    </>
  );
};

MovieCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieCard);
