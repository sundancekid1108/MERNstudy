import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import { Paper } from '../../../../Components/Index';
import { EventSeat } from '@material-ui/icons';

import styles from './Styles';

const TheaterCard = (props) => {
  const { className, classes, theater } = props;
  const rootClassName = classNames(classes.root, className);
  return (
    <>
      <Paper className={rootClassName}>
        <div className={classes.imageWrapper}>
          <img alt="theater" className={classes.image} src={theater.image} />
        </div>
        <div className={classes.details}>
          <Typography className={classes.name} variant="h4">
            {theater.theaterName}
          </Typography>
          <Typography className={classes.city} variant="body1">
            {theater.city}
          </Typography>
        </div>
        <div className={classes.stats}>
          <EventSeat className={classes.eventIcon} />
          <Typography className={classes.eventText} variant="body2">
            {theater.seatsAvailable}
          </Typography>
        </div>
      </Paper>
    </>
  );
};

TheaterCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TheaterCard);
