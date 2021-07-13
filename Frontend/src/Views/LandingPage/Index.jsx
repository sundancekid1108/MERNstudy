import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import styles from './Styles';
import PublicNavbar from '../../Layouts/Public/Components/Navbar/Index';
import MoviesList from './Components/MoviesList/Index';

const LandingPage = (props) => {
  const { classes } = props;
  return (
    <>
      <div className={classes.root}>
        <PublicNavbar />
        <MoviesList />
      </div>
    </>
  );
};

LandingPage.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(LandingPage);
