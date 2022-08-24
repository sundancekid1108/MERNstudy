import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import TmdbMovieCard from './Components/TmdbMovieCard/TmdbMovieCard';
import TmdbMovieToolBar from './Components/TmdbMovieToolBar/TmdbMovieToolBar'
import { ResponsiveDialog } from '../../../Components/Index';
import Dashboard from '../../../Layouts/Dashboard/Dashboard';
import * as  TmdbApi from '../../../Api/TmdbApi/TmdbApi'

import styles from './Styles';
import TmdbMovieInfo from './Components/TmdbMovieInfo/TmdbMovieInfo';

const TmdbMoviePage = (props) => {
  const { classes, ...rest } = props;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [tmdbUpcomingMovieList, setTmdbUpcomingMovieList] = useState(null);
  const [tmdbMovieSearchResult, setTmdbMovieSearchResult] = useState(null);
  const [tmdbMovie, setTmdbMovie] = useState(null);
  const [tmdbMovieInfo, setTmdbMovieInfo] = useState(null)
  const [tmdbMovieCast, settmdbMovieCast] = useState(null)

  const [keyword, setKeyword] = useState('');


  const getTmdbUpcomingMovieList = async () => {
    const result = await TmdbApi.getTmdbUpcomingMovieList()
    const data = result.data.results
    setTmdbUpcomingMovieList(data)

  }

  useEffect(() => {
    getTmdbUpcomingMovieList()
    setTmdbMovie(null)

  }, []);

  const onChange = (event) => {
    setKeyword(event.target.value)
  }

  const setMovie = (movie) => {
    setTmdbMovie(movie)
  }

  const handleDialong = (e) => {
    if (dialog == false) {
      setDialog(true);
    } else {
      setDialog(false);
    }
  };





  const handleTmdbMovieSearch = async () => {
    // console.log('handleTmdbMovieSearch')
    console.log("keyword", keyword)
    try {
      const response = await TmdbApi.getSearchTmdbMovie(keyword)
      // console.log(response.data.results)
      const data = response.data.results
      setTmdbMovieSearchResult(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getTmdbMovieInfoById = async (id) => {
    const result = await TmdbApi.getTmdbMovieInfoById(id)
    if (result.status == 200) {
      const data = result.data
      setTmdbMovieInfo(data)

    } else {
      setTmdbMovieInfo(null)
    }

  }

  const getTmdbMovieCreditsInfoById = async (id) => {
    const result = await TmdbApi.getTmdbMovieCreditsInfoById(id)
    if (result.status == 200) {
      const data = result.data
      settmdbMovieCast(data)

    } else {
      settmdbMovieCast(null)
    }


  }

  const handleTmdBMovieInfo = (movie) => {
    getTmdbMovieInfoById(movie.id)
    getTmdbMovieCreditsInfoById(movie.id)
    if (dialog == false) {
      setTmdbMovie(movie)
      handleDialong();

    } else {
      setTmdbMovie(null)
      handleDialong();
    }
  }


  // console.log("tmdbUpcomingMovieList", tmdbUpcomingMovieList)
  // console.log('tmdbMovie', tmdbMovie)

  // console.log("tmdbMovieSearchResult", tmdbMovieSearchResult)


  const tmdbMovieListRender = () => {
    if (tmdbMovieSearchResult) {
      return (
        <>
          <Grid container spacing={3}>
            {tmdbMovieSearchResult.map((movie) => (
              <Grid
                item
                key={movie.id}
                lg={4}
                md={6}
                xs={12}
                onClick={() => handleTmdBMovieInfo(movie)}
              >
                <TmdbMovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
          <ResponsiveDialog
            id="Edit-movie"
            open={dialog}
            handleClose={handleDialong}>
            <TmdbMovieInfo movie={tmdbMovie} />
          </ResponsiveDialog>

        </>
      )
    }
    if (!tmdbUpcomingMovieList) {
      return <>
        <Typography variant="h6">No movieList Data</Typography>
      </>
    } else {
      return <>
        <Grid container spacing={3}>
          {tmdbUpcomingMovieList.map((movie) => (
            <Grid
              item
              key={movie.id}
              lg={4}
              md={6}
              xs={12}
              onClick={() => handleTmdBMovieInfo(movie)}
            >
              <TmdbMovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
        <ResponsiveDialog
          id="Edit-movie"
          open={dialog}
          handleClose={handleDialong}>
          <TmdbMovieInfo movie={tmdbMovie} tmdbMovieInfo={tmdbMovieInfo} tmdbMovieCast={tmdbMovieCast} />
        </ResponsiveDialog>
      </>
    }
  }

  return (
    <>
      <Dashboard title="TMDB Movie Page">
        <div className={classes.root}>

          <TmdbMovieToolBar onChange={onChange} handleTmdbMovieSearch={handleTmdbMovieSearch} keyword={keyword} />
          <div className={classes.content}>
            {tmdbMovieListRender()}
          </div>

        </div>


      </Dashboard>
    </>
  );

};

TmdbMoviePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TmdbMoviePage);
