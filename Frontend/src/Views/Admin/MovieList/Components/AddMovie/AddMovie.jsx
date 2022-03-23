import React, { useState, useEffect, useRef, usePrevious } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, Grid, Button, TextField, Typography, MenuItem } from '@material-ui/core';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
// import DateFnsUtils from '@date-io/date-fns';
// import Portlet from '../../../../../Components/Portlet/Portlet';
// import PortletHeader from '../../../../../Components/PortletHeader/PortletHeader';
// import PortletLabel from '../../../../../Components/PortletLabel/PortletLabel';
// import PortletContent from '../../../../../Components/PortletContent/PortletContent';
// import PortletFooter from '../../../../../Components/PortletFooter/PortletFooter';

import {
  genreData,
  languageData
} from '../../../../../Utils/MovieDataService/MovieDataService';
import * as MovieAction from '../../../../../Store/Actions/MovieAction';

import styles from './Styles';

const AddMovie = (props) => {
  const { editmovie, classes, className, ...rest } = props;
  const rootClassName = classNames(classes.root, className);
  const form = useRef();

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [movieImage, setMovieImage] = useState('');
  const [language, setLanguage] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [director, setDirector] = useState('');
  const [cast, setCast] = useState('');
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [status, setStatus] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const dispatch = useDispatch();

  // const prevMovie = props.editmovie;
  const prevMovie = editmovie;
  // console.log('prevMovie', prevMovie);
  useEffect(() => {
    if (prevMovie) {
      setTitle(prevMovie.title);
      setGenre(prevMovie.genre);
      setMovieImage(prevMovie.image);
      setLanguage(prevMovie.language);
      setDuration(prevMovie.duration);
      setDescription(prevMovie.description);
      setDirector(prevMovie.director);
      setCast(prevMovie.cast);
      setReleaseDate(prevMovie.releaseDate);
      setEndDate(prevMovie.endDate);
    }
  }, []);

  const onChangeTitle = (e) => {
    const data = e.target.value;
    setTitle(data);
  };

  const onChangeImage = (e) => {
    const data = e.target.value;
    setMovieImage(data);
  };

  const onChangeGenre = (e) => {
    const data = e.target.value;
    setGenre(data);
  };

  const onChangeDescription = (e) => {
    const data = e.target.value;
    setDescription(data);
  };
  const onChangeLanguage = (e) => {
    const data = e.target.value;
    setLanguage(data);
  };
  const onChangeDuration = (e) => {
    const data = e.target.value;
    setDuration(data);
  };

  const onChangeCast = (e) => {
    const data = e.target.value;
    setCast(data);
  };

  const onChangeDirector = (e) => {
    const data = e.target.value;
    setDirector(data);
  };

  const handleCreateMovie = async (e) => {
    if (
      title === '' ||
      genre === '' ||
      movieImage === '' ||
      language === '' ||
      duration === '' ||
      description === '' ||
      director === '' ||
      cast === '' ||
      releaseDate === '' ||
      endDate === ''
    ) {
      setInfoMessage('Movie have not been saved, try again.');
    } else {
      const body = {
        title: title,
        image: movieImage,
        genre: genre,
        language: language,
        duration: duration,
        description: description,
        director: director,
        cast: cast,
        releaseDate: releaseDate,
        endDate: endDate
      };
      try {
        const response = await dispatch(
          MovieAction.createMovie(
            body

          )
        );

        setStatus(true);
        setInfoMessage('Movie have been saved!');
        dispatch(MovieAction.getMovieList());
        console.log(response);
        return response;
      } catch (error) {
        setStatus(false);
        setInfoMessage('Movie have not been saved, try again.');
        console.log(error);
      }
    }
  };

  const handleUpdateMovie = async (e) => {
    // console.log('handleUpdateMovieInfo');
    if (
      title === '' ||
      genre === '' ||
      movieImage === '' ||
      language === '' ||
      duration === '' ||
      description === '' ||
      director === '' ||
      cast === '' ||
      releaseDate === '' ||
      endDate === ''
    ) {
      setInfoMessage('Movie have not been saved, try again.');
    } else {
      try {
        const body = {
          title: title,
          image: movieImage,
          genre: genre,
          language: language,
          duration: duration,
          description: description,
          director: director,
          cast: cast,
          releaseDate: releaseDate,
          endDate: endDate
        };
        const response = await dispatch(
          MovieAction.updateMovie(
            prevMovie._id,
            body

          )
        );
        setStatus(true);
        setInfoMessage('Updated Movie have been saved!');
        // console.log(response);
        return response;
      } catch (error) {
        setStatus(false);
        setInfoMessage('Updated Movie have not been saved, try again.');
        console.log(error);
      }
    }
  };

  const handleDeleteMovie = async (e) => {
    const id = prevMovie._id;
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

  const subtitle = prevMovie ? 'Edit Movie' : 'Add Movie';
  const submitButton = prevMovie ? 'Update Movie' : 'Save Movie Info';
  const submitAction = prevMovie ? handleUpdateMovie : handleCreateMovie;

  return (
    <>
      <div className={rootClassName} {...rest}>
        <Typography variant="h4" className={classes.title}>
          {subtitle}
        </Typography>
        <form autoComplete="off" noValidate ref={form}>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              helperText="Please specify the title"
              label="Title"
              margin="dense"
              required
              value={title}
              variant="outlined"
              onChange={onChangeTitle}
            />
            <TextField
              select
              className={classes.textField}
              label="Genre"
              margin="dense"
              required
              value={genre}
              variant="outlined"
              onChange={onChangeGenre}>
              {genreData.map((genreItem, index) => (
                <MenuItem key={genreItem + '-' + index} value={genreItem}>
                  {genreItem}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className={classes.field}>
            <TextField
              fullWidth
              className={classes.textField}
              label="Movie Image URL"
              margin="dense"
              variant="outlined"
              required
              value={movieImage}
              onChange={onChangeImage}
            />
            <TextField
              fullWidth
              className={classes.textField}
              label="Description"
              margin="dense"
              variant="outlined"
              required
              value={description}
              onChange={onChangeDescription}
            />
          </div>

          <div className={classes.field}>
            <TextField
              select
              className={classes.textField}
              label="Language"
              margin="dense"
              required
              value={language}
              variant="outlined"
              onChange={onChangeLanguage}>
              {languageData.map((langItem) => (
                <MenuItem value={langItem}>{langItem}</MenuItem>
              ))}
            </TextField>
            <TextField
              className={classes.textField}
              label="Duration"
              margin="dense"
              type="number"
              required
              InputProps={{
                inputProps: {
                  max: 1000,
                  min: 0
                }
              }}
              value={duration}
              variant="outlined"
              onChange={onChangeDuration}
            />

          </div>
          <div className={classes.field}>
            <TextField
              className={classes.textField}
              label="Director"
              margin="dense"
              required
              value={director}
              variant="outlined"
              onChange={onChangeDirector}
            />
            <TextField
              className={classes.textField}
              label="Cast"
              margin="dense"
              required
              value={cast}
              variant="outlined"
              onChange={onChangeCast}
            />
          </div>
          <div className={classes.field}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                className={classes.textField}
                autoOk
                margin="normal"
                id="release-date"
                label="Release Date"
                format="YYYY-MM-DD"
                views={['year', 'month', 'date']}
                value={releaseDate}
                variant="inline"
                onChange={(data) => setReleaseDate(data)}
                inputVariant="outlined"
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                className={classes.textField}
                autoOk
                margin="normal"
                id="end-date"
                label="End Date"
                format="YYYY-MM-DD"
                views={['year', 'month', 'date']}
                value={endDate}
                variant="inline"
                onChange={(data) => setEndDate(data)}
                inputVariant="outlined"
              />
            </MuiPickersUtilsProvider>
          </div>
          <Button
            className={classes.buttonFooter}
            color="default"
            variant="contained"
            onClick={submitAction}>
            {submitButton}
          </Button>
          {prevMovie && (
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

      </div>

    </>
  );
};

AddMovie.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  editmovie: PropTypes.object.isRequired
};

export default withStyles(styles)(AddMovie);

/**
 * KeyboardDatePicker format 속성에 따라 에러 뜸...
 * 중요: material-ui-pickers v3의 경우 @date-io 어댑터의 v1.x 버전을 사용하십시오 .
 *
 *
 * MovieList 어떻게 prevMovie Data를 전달받는지 다시 확인
 * 이를통해 하나의 페이지로, add, edit 구현
 */
