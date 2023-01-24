import React, { useEffect, useState } from 'react';
import {
  Grid, Typography, Table, Container,
  TableBody,
  TableCell,
  TableHead,
  TableRow, withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import styles from './Styles'

const MyMovieTicket = (props) => {
  console.log("MyMovieTicket props", props)
  const { classes, className, userMovieReservation } = props;
  const rootClassName = classNames(classes.root, className);
  useEffect(()=> {}, [])

  return (<>
    <Container maxWidth="xl" className={classes.container}>
      <Grid item>
        <div  className={classes.title} >
          <Typography className={classes.title} variant="h5"> 
          {userMovieReservation.movieId.title}
        </Typography>
          
        </div>
        <div className={classes.imageWrapper}>
          <img alt="movie" className={classes.image} src={"https://image.tmdb.org/t/p/original/" + userMovieReservation.movieId.poster_path} />
        </div>
        <Table>
          <TableHead>
            <TableCell >SCREEN</TableCell>
            <TableCell colSpan={2}>ROWS</TableCell>
            {/* <TableCell >SEATS</TableCell> */}
          </TableHead>
          <TableBody>
            <TableCell >
              {userMovieReservation.theaterId.theaterName}
            </TableCell>
            <TableCell colSpan={2} >
              {userMovieReservation.seats.map((seat) => ("A"+  seat[0]))}
            </TableCell>
            <TableCell >
              {userMovieReservation.seats.map((seat) => (seat[0] + "/" + seat[0] + " "))}
            </TableCell>
          </TableBody>
          <TableHead>
            <TableCell >PRICE</TableCell>
            <TableCell >DATE</TableCell>
            <TableCell >TIME</TableCell>
          </TableHead>

          <TableBody>
            <TableCell >
              {userMovieReservation.theaterId.ticketPrice}
            </TableCell>
            <TableCell >
              {moment(userMovieReservation.startAt).format('YYYY MM DD')}
            </TableCell>
            <TableCell >
              {moment(userMovieReservation.startAt).format('HH:mm')}
            </TableCell>

          </TableBody>
        </Table>
      </Grid>
    </Container>
    
  </>)
}

export default withStyles(styles)(MyMovieTicket)



  