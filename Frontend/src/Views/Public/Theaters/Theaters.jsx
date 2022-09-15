import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, Grid, Typography, Container } from '@material-ui/core';
import TheaterCard from '../Components/TheaterCard/TheaterCard';
import { getTheaterList } from '../../../Store/Actions/Index';
import styles from './Styles';

const Theaters = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const theaters = useSelector((state) => state.theaters.theaters);

  useEffect(() => {
    dispatch(getTheaterList());
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Container maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                className={classes.title}
                variant="h2"
                color="inherit">
                Theaters
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              direction="column"
              alignItems="center"
              justifyContent="flex-start"
              spacing={2}>
              {theaters.map((theater) => (
                <Grid key={theater._id} item xs={12} md={4} lg={3}>
                  <TheaterCard theater={theater} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

Theaters.propTypes = {
  className: PropTypes.string
};

export default withStyles(styles)(Theaters);
