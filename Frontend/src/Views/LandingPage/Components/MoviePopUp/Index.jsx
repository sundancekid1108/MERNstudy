import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom';
import styles from './Style';

const MoviePopUp = (props) => {
  const { classes } = props;
  return (
    <>
      <Zoom in={true}>
        <div>
          <div>Popuptest</div>
        </div>
      </Zoom>
    </>
  );
};

MoviePopUp.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default MoviePopUp;
// export default withStyles(styles)(MoviePopUp);
