import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import TheatersToolbar from './Components/TheatersToolbar/TheatersToolbar';
import { ResponsiveDialog } from '../../../Components/Index';
import styles from './Styles';
import Dashboard from '../../../Layouts/Dashboard/Dashboard';
import AddTheater from './Components/AddTheater/AddTheater';
import TheaterCard from '../../Public/Components/TheaterCard/TheaterCard';
import { getTheaterList } from '../../../Store/Actions/Index';

const TheatersList = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [editTheater, setEditTheater] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);

  const [searchTheaterResult, setSearchTheaterResult] = useState(null)

  const [keyword, setKeyword] = useState('');

  const theaters = useSelector((state) => state.theaters.theaters);
  useEffect(() => {
    dispatch(getTheaterList());

    // setTheaters(results);
  }, [theaters.length]);

  const onChange = (event) => {
    setKeyword(event.target.value)
  }

  const handleEditDialog = (e) => {
    if (isOpenEditDialog == false) {
      setIsOpenEditDialog(true);
    } else {
      setIsOpenEditDialog(false);
    }
  };

  const handleEditTheater = (theater) => {
    if (isOpenEditDialog == false) {
      handleEditDialog();
      setEditTheater(theater);
    } else {
      handleEditDialog();
      setEditTheater(null);
    }
  };


  const handleTheaterSearch = (event) => {

    const match = (term, array, key) => {
      const reg = new RegExp(term.split('').join('.*'), 'i');
      console.log(reg)
      return array.filter(item => item[key] && item[key].match(reg));
    };


    if (event.key === "Enter") {
      const result = match(keyword, theaters, 'theaterName')

      setSearchTheaterResult(result)
      console.log(searchTheaterResult)
    }

    else if (event.type === 'click') {
      const result = match(keyword, theaters, 'theaterName')

      setSearchTheaterResult(result)
      console.log(searchTheaterResult)
    }
  }

  // console.log(theaters)

  const theaterRender = () => {
    if (isLoading) {
      return (
        <>
          <div className={classes.progressWrapper}>
            <CircularProgress />
          </div>
        </>
      );
    } else if (!theaters) {
      return (
        <>
          <Typography variant="h6">There are no Theaters available</Typography>
        </>
      );
    } else if (searchTheaterResult) {
      return (
        <>
          <div className={classes.content}>
            <Grid container spacing={3}>
              {searchTheaterResult.map((theater) => (
                <Grid
                  item
                  key={theater._id}
                  lg={4}
                  md={6}
                  xs={12}
                  onClick={() => handleEditTheater(theater)}>
                  <TheaterCard theater={theater} />
                </Grid>
              ))}
            </Grid>
          </div>
        </>
      );

    } else {
      return (
        <>
          <div className={classes.content}>
            <Grid container spacing={3}>
              {theaters.map((theater) => (
                <Grid
                  item
                  key={theater._id}
                  lg={4}
                  md={6}
                  xs={12}
                  onClick={() => handleEditTheater(theater)}>
                  <TheaterCard theater={theater} />
                </Grid>
              ))}
            </Grid>
          </div>
        </>

      );
    }
  };

  return (
    <>
      <div className={classes.root}>
        <TheatersToolbar onChange={onChange} handleTheaterSearch={handleTheaterSearch} keyword={keyword} />
        {theaterRender()}
        <ResponsiveDialog
          id="Edit-theater"
          open={isOpenEditDialog}
          handleClose={handleEditDialog}>
          <AddTheater editTheater={editTheater} />
        </ResponsiveDialog>
      </div>
    </>
  );
};

export default withStyles(styles)(TheatersList);
