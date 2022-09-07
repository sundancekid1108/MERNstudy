import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

import { SearchInput } from '../../../../../Components/Index';
import styles from './Styles';

const MovieReservationListToolbar = (props) => {
  const { classes, className, onChange, handleSearchMovieReservation, keyword } = props;
  const rootClassName = classNames(classes.root, className);

  return (
    <div className={rootClassName}>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search reservation by username"
          onChange={onChange}
          value={keyword}
          onKeyPress={handleSearchMovieReservation}
          onClick={handleSearchMovieReservation}
          handleSearchMovieReservation={handleSearchMovieReservation}
        />
      </div>
    </div>
  );
};

MovieReservationListToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieReservationListToolbar);
