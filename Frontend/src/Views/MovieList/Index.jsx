import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import {
  IconButton,
  CircularProgress,
  Grid,
  Typography
} from '@material-ui/core';
import { ChevronRightIcon, ChevronLeftIcon } from '@material-ui/icons';
import { MovieToolBar, MovieCard } from './Components/Index';

import {
  DisplayMode,
  SearchInput,
  ResponsiveDialog
} from '../../Components/Index';

import Dashboard from '../../Layouts/Dashboard/Dashboard';

import styles from './Styles';
const MovieList = (props) => {
  return (
    <>
      <Dashboard title="Movie List">
        <MovieToolBar />
        <Grid>
          <MovieCard> Movie card</MovieCard>
        </Grid>
      </Dashboard>
    </>
  );
};

MovieList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieList);
