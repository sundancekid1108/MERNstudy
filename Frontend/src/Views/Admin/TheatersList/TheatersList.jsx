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
import { getTheatersList } from '../../../Store/Actions/Index';

const TheatersList = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  // const [theaters, setTheaters] = useState(null);
  const [editTheater, setEditTheater] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);

  // const results = useSelector((state) => state.theaters.theaters);
  const theaters = useSelector((state) => state.theaters.theaters);
  useEffect(() => {
    dispatch(getTheatersList());

    // setTheaters(results);
  }, [theaters.length]);

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
  console.log(theaters);

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
          <Typography variant="h6">There are no cinemas available</Typography>
        </>
      );
    } else {
      return (
        <>
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
        </>
      );
    }
  };

  return (
    <>
      <Dashboard title="Cinemas">
        <div className={classes.root}>
          <TheatersToolbar />
          {theaterRender()}
          <ResponsiveDialog
            id="Edit-theater"
            open={isOpenEditDialog}
            handleClose={handleEditDialog}>
            <AddTheater editTheater={editTheater} />
          </ResponsiveDialog>
        </div>
      </Dashboard>
    </>
  );
};

export default withStyles(styles)(TheatersList);
