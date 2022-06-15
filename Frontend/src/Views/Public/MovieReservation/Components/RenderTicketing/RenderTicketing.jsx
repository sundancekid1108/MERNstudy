import React from 'react';
import { withStyles, Box, Grid, Typography, Button } from '@material-ui/core';
import styles from './Styles';

const RenderTicketing = (props) => {
  const { classes, userInfo, selectedSeatsList, selectedMovieShowTime, selectedTheater, seatsAvailable, handleMovieReservation } = props;


  return <>

    <Box marginTop={2} bgcolor="rgb(18, 20, 24)">
      <Grid container>
        <Grid item xs={10}>
          <Grid container spacing={3} style={{ padding: 20 }}>
            <Grid item>
              <Typography className={classes.bannerTitle}>
                Name
              </Typography>
              <Typography className={classes.bannerContent}>
                {userInfo ? userInfo.userName : null}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.bannerTitle}>
                Tickets
              </Typography>
              {selectedSeatsList.length > 0 ? (
                <Typography className={classes.bannerContent}>
                  {selectedSeatsList.length} tickets
                </Typography>
              ) : (
                <Typography className={classes.bannerContent}>
                  {'  '}
                  {' - '}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Typography className={classes.bannerTitle}>
                Price
              </Typography>
              {!selectedTheater ? (
                <Typography className={classes.bannerContent}>
                  0 $
                </Typography>
              ) : (
                <Typography className={classes.bannerContent}>
                  {selectedTheater.ticketPrice *
                    selectedSeatsList.length}{' '}
                  $
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            color: 'rgb(120, 205, 4)',
            background: 'black',
            display: 'flex'
          }}>
          <Button
            color="inherit"
            fullWidth
            disabled={seatsAvailable <= 0}
            onClick={() => handleMovieReservation()}>
            Checkout
          </Button>
        </Grid>
      </Grid>
    </Box>
  </>

}

export default withStyles(styles)(RenderTicketing);