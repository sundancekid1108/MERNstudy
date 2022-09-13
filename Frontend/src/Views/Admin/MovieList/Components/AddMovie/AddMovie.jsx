import React, { useState, useEffect, useRef, usePrevious } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, Grid, Button, TextField, Typography, MenuItem, Select } from '@material-ui/core';
import * as  TmdbApi from '../../../../../Api/TmdbApi/TmdbApi'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import {
  genreData,
  languageData
} from '../../../../../Utils/MovieDataService/MovieDataService';
import * as MovieAction from '../../../../../Store/Actions/MovieAction';

import styles from './Styles';
import { FormControlUnstyledContext } from '@mui/base';

const AddMovie = (props) => {
  // const { classes, className, tmdbMovieList, editMovie } = props;
  const { classes, className, editMovie } = props;
  console.log("AddMovie props", props)

  const tmdbMovieList = useSelector((state) => state.tmdbMovies.tmdbMovies);
  const movieList = useSelector((state) => state.movies.movies);



  const rootClassName = classNames(classes.root, className);
  const form = useRef();

  const [selectedMovie, setSelectedMovie] = useState('')
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [status, setStatus] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (editMovie) {

      setStartDate(editMovie.startDate);
      setEndDate(editMovie.endDate);
    }
  }, []);


  const handleSelectedMovie = (e) => {
    const data = e.target.value
    // console.log(data)
    setSelectedMovie(data)
  }

  const handleCreateMovie = async (e) => {
    // console.log(selectedMovie)
    // const body = Object.assign({}, selectedMovie, { "startDate": startDate }, { "endDate": endDate })
    const data = tmdbMovieList.find((movie) => movie._id === selectedMovie._id)
    const body = Object.assign({}, data, { "startDate": startDate }, { "endDate": endDate })

    if (!body._id) {
      setInfoMessage('Movie have not been saved, try again.');
    } else {
      // console.log(body)
      try {
        const response = await dispatch(
          MovieAction.createMovie(
            body

          )
        );
        // console.log("handleCreateMovie response", response)

        setStatus(true);
        if (response.status === 400) {
          setInfoMessage('Movie have not been saved, try again.');
          return response;
        }
        setInfoMessage('Movie have been saved!');
        dispatch(MovieAction.getMovieList());
        // console.log(response);
        return response;

      } catch (error) {
        setStatus(false);
        setInfoMessage('Movie have not been saved, try again.');
        console.log(error);
      }
    }


  };

  const handleUpdateMovie = async (e) => {
    const body = { startDate, endDate }
    console.log(body)
    try {
      const response = await dispatch(
        MovieAction.updateMovie(
          editMovie._id,
          body

        )
      );
      setStatus(true);
      setInfoMessage('Updated Movie have been saved!');
      console.log(response);
      return response;
    } catch (error) {
      setStatus(false);
      setInfoMessage('Updated Movie have not been saved, try again.');
      console.log(error);
    }
  };

  const handleDeleteMovie = async (e) => {
    const id = editMovie._id;
    try {
      const response = await dispatch(MovieAction.deleteMovie(id));
      setStatus(true);
      setInfoMessage('Movie have been deleted!');
      return response;
    } catch (error) {
      setStatus(false);
      setInfoMessage('Failed to delte Movie , try again.');
      console.log(error);
    }
  };

  const subtitle = editMovie ? 'Edit Movie' : 'Add Movie';
  const submitButton = editMovie ? 'Update Movie' : 'Save Movie Info';
  const submitAction = editMovie ? handleUpdateMovie : handleCreateMovie;


  // console.log("Addmovie tmdbMovieList", tmdbMovieList)

  const renderForm = () => {
    if (editMovie) {
      return (<>
        <form autoComplete="off" noValidate ref={form}>

          <div className={classes.field}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                className={classes.textField}
                // disableOpenPicker={true}
                margin="normal"
                id="start-date"
                label="Start Date"
                inputFormat="yyyy-MM-dd"
                inputVariant="outlined"
                value={startDate}
                variant="inline"
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
                onChange={(data) => setStartDate(data)}
                renderInput={(params) => <TextField  {...params} />}
              />

              <DesktopDatePicker
                className={classes.textField}
                // disableOpenPicker={true}
                margin="normal"
                id="End-date"
                label="End Date"
                inputFormat="yyyy-MM-dd"
                inputVariant="outlined"
                value={endDate}
                onChange={(data) => setEndDate(data)}

                variant="inline"
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
                renderInput={(params) => <TextField className={classes.textField}  {...params} />}
              />
            </LocalizationProvider>
          </div>





          <Button
            className={classes.buttonFooter}
            color="default"
            variant="contained"
            onClick={submitAction}>
            {submitButton}
          </Button>
          {editMovie && (
            <Button
              className={classes.buttonFooter}
              color="default"
              variant="contained"
              onClick={handleDeleteMovie}>
              Delete Movie
            </Button>
          )}
          <Typography
            className={classes.infoMessage}
            color="primary"
            variant="caption">
            {infoMessage}
          </Typography>

        </form>
      </>)
    } else {
      if (tmdbMovieList) {
        return <>
          <form autoComplete="off" noValidate ref={form}>
            <div className={classes.field}>

              <TextField
                select
                className={classes.textField}
                label="Select Movie"
                margin="dense"
                required
                value={selectedMovie}
                defaultValue={tmdbMovieList[0]}
                variant="outlined"
                onChange={handleSelectedMovie}>
                {tmdbMovieList.map((movie) => (
                  <MenuItem key={movie._id} value={movie}>
                    {movie.title}
                  </MenuItem>
                ))}
              </TextField>

            </div>

            {selectedMovie &&
              <div className={classes.field}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    className={classes.textField}
                    // disableOpenPicker={true}
                    margin="normal"
                    id="start-date"
                    label="Start Date"
                    inputFormat="yyyy-MM-dd"
                    inputVariant="outlined"
                    // minDate={new Date()}
                    // maxDate={getMaxDate()}
                    value={startDate}
                    variant="inline"
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    onChange={(data) => setStartDate(data)}
                    renderInput={(params) => <TextField  {...params} />}
                  />

                  <DesktopDatePicker
                    className={classes.textField}
                    // disableOpenPicker={true}
                    margin="normal"
                    id="End-date"
                    label="End Date"
                    inputFormat="yyyy-MM-dd"
                    inputVariant="outlined"
                    // minDate={new Date(startDate)}
                    // maxDate={getMaxDate()}
                    value={endDate}
                    onChange={(data) => setEndDate(data)}

                    variant="inline"
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                    renderInput={(params) => <TextField className={classes.textField}  {...params} />}
                  />
                </LocalizationProvider>
              </div>
            }



            <Button
              className={classes.buttonFooter}
              color="default"
              variant="contained"
              onClick={submitAction}>
              {submitButton}
            </Button>
            {editMovie && (
              <Button
                className={classes.buttonFooter}
                color="default"
                variant="contained"
                onClick={handleDeleteMovie}>
                Delete Movie
              </Button>
            )}
            <Typography
              className={classes.infoMessage}
              color="primary"
              variant="caption">
              {infoMessage}
            </Typography>

          </form>
        </>
      } else {
        return <>
          <div className={classes.field}>
            No TMDB Movie Data
          </div>
        </>
      }
    }



  }

  return (
    <>
      <div className={rootClassName}>
        <Typography variant="h4" className={classes.title}>
          {subtitle}
        </Typography>

        {renderForm()}
      </div>

    </>
  );
};

AddMovie.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  editmovie: PropTypes.object
};

export default withStyles(styles)(AddMovie);

/**
 * KeyboardDatePicker format 속성에 따라 에러 뜸...
 * 중요: material-ui-pickers v3의 경우 @date-io 어댑터의 v1.x 버전을 사용하십시오 .
 *
 *
 * MovieList 어떻게 editMovie Data를 전달받는지 다시 확인
 * 이를통해 하나의 페이지로, add, edit 구현
 */
