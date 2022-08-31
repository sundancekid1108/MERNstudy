import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom'
import { withStyles, Grid, Typography } from '@material-ui/core';
import * as MovieAction from '../../../../../Store/Actions/MovieAction'
import styles from './Styles';
import { useDispatch, useSelector } from 'react-redux';
import * as MovieApi from '../../../../../Api/MovieApi/MovieApi';

const RenderMovieInfo = (props) => {
  // console.log("RenderMovieInfo props", props)
  const { classes, movie } = props;
  const dispatch = useDispatch();
  const params = useParams()
  const movieId = params.id

  const getMovieInfo = async (id) => {
    try {
      const res = await MovieApi.getMovieInfo(id);
      const movieData = res.data;
      // console.log("getMovieInfo Test", movieData)
      // setMovie(movieData);
    } catch (error) {
      console.log('getMovieInfo', error);
    }
  }


  const movieList = useSelector((state) => state.movies.movies);


  const movieInfo = movieList.find((item) => item._id === movieId)

  // console.log("movieInfo", movieInfo)
  // console.log(movieInfo.cast.slice(0, 4))

  useEffect(() => {

    getMovieInfo(movieId)
  }, [])


  if (movieInfo) {
    return (
      <>
        <Grid item xs={12} md={12} lg={3}>
          <div className={classes.movieInfos}>
            <div
              className={classes.background}
              style={{
                backgroundImage: `url(${"https://image.tmdb.org/t/p/original/" + movie.poster_path})`
              }}
            />
            <Typography className={classes.title}>
              {movie.title}
            </Typography>
            <div className={classes.info}>

              <div className={classes.infoBox}>
                <Typography variant="subtitle1" color="inherit">
                  Director
                </Typography>
                <Typography variant="caption" color="inherit">
                  {movieInfo.crew.filter(({ job }) => job === "Director")[0].name}
                </Typography>
              </div>
              <div className={classes.infoBox}>
                <Typography variant="subtitle1" color="inherit">
                  Cast
                </Typography>
                <Typography variant="caption" color="inherit">
                  {movieInfo.cast.slice(0, 4).map((people) => (<div key={people.id}>{people.name}</div>))}

                </Typography>
              </div>

              <div className={classes.infoBox}>
                <Typography variant="subtitle1" color="inherit">
                  Genres
                </Typography>
                <Typography variant="caption" color="inherit">
                  {movieInfo.genres.map((genre, id) => (
                    <div key={genre.id}>
                      {genre.name}
                    </div>
                  ))}
                </Typography>

              </div>
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