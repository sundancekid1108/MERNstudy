import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import { Grid, GridList } from '@material-ui/core';
import styles from './Styles';
import MovieCard from '../MovieCard/Index';

const MoviesList = (props) => {
  // const { classes, movies } = props;
  const { classes } = props;
  const movies = [
    {
      id: 459151,

      title: 'The Boss Baby: Family Business',
      director: 'cheol',
      language: 'en',
      description:
        'The Templeton brothers — Tim and his Boss Baby little bro Ted — have become adults and drifted away from each other. But a new boss baby with a cutting-edge approach and a can-do attitude is about to bring them together again … and inspire a new family business.',
      cast: '철철',
      duration: '120'
    },
    {
      id: 459152,

      title: 'The Boss Baby: Family Business2',
      director: 'cheol',
      language: 'en',
      description:
        'The Templeton brothers — Tim and his Boss Baby little bro Ted — have become adults and drifted away from each other. But a new boss baby with a cutting-edge approach and a can-do attitude is about to bring them together again … and inspire a new family business.',
      cast: '철철',
      duration: '120'
    },
    {
      id: 459153,

      title: 'The Boss Baby: Family Business',
      director: 'cheol',
      language: 'en',
      description:
        'The Templeton brothers — Tim and his Boss Baby little bro Ted — have become adults and drifted away from each other. But a new boss baby with a cutting-edge approach and a can-do attitude is about to bring them together again … and inspire a new family business.',
      cast: '철철',
      duration: '120'
    }
  ];
  return (
    <>
      <Container maxWidth="xl" className={classes.container}>
        <Grid
          className={classes.fullHeight}
          container
          alignItems="center"
          justify="center"
          spacing={5}>
          <Grid item xs={3}>
            <div className={classes.title}>
              <h2 className={classes.h2}>Latest News</h2>
              <h4 className={classes.h4}>Covering March & April 2015</h4>
            </div>
          </Grid>
          <Grid item xs={9}>
            <GridList className={classes.gridList} cols={2.5}>
              {movies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
              MoviesList(MOvieCard)
            </GridList>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

MoviesList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(MoviesList);
