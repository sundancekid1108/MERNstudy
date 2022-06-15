import React, { useState, useEffect } from 'react';
import { withStyles, Grid, Typography } from '@material-ui/core';
import styles from './Styles';

const RenderMovieInfo = (props) => {
  const { classes, movie } = props;

  if (movie) {
    return (
      <>
        <Grid item xs={12} md={12} lg={3}>
          <div className={classes.movieInfos}>
            <div
              className={classes.background}
              style={{
                backgroundImage: `url(${movie.image})`
              }}
            />
            <Typography className={classes.title}>
              {movie.title}
            </Typography>
            <div className={classes.info}>
              {movie.director && (
                <div className={classes.infoBox}>
                  <Typography variant="subtitle1" color="inherit">
                    Director
                  </Typography>
                  <Typography variant="caption" color="inherit">
                    {movie.director}
                  </Typography>
                </div>
              )}
              {movie.cast && (
                <div className={classes.infoBox}>
                  <Typography variant="subtitle1" color="inherit">
                    Cast
                  </Typography>
                  <Typography variant="caption" color="inherit">
                    {movie.cast}
                  </Typography>
                </div>
              )}
              {movie.genre && (
                <div className={classes.infoBox}>
                  <Typography variant="subtitle1" color="inherit">
                    Genre
                  </Typography>
                  <Typography variant="caption" color="inherit">
                    {movie.genre}
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </Grid>
      </>
    )
  } else {
    return (
      <>
        <h1>Movie Loading...</h1>
      </>
    )

  }


}


export default withStyles(styles)(RenderMovieInfo);