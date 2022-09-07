import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  withStyles
} from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Portlet, PortletContent } from '../../../../../Components/Index';
import styles from './Styles';

const MovieReservationListTable = (props) => {
  console.log(props);
  const { classes, className, MovieReservationList } =
    props;
  const rootClassName = classNames(classes.root, className);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
    // console.log('handleChangePage');
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
    // console.log('handleChangeRowsPerPage');
  };

  const filterAttr = (id, list, attr) => {
    const item = list.find((item) => item._id === id);
    return item ? item[attr] : `Not ${attr} Found`;
  };

  return (
    <>
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Start At</TableCell>
                <TableCell align="left">Movie</TableCell>
                <TableCell align="left">Theater</TableCell>
                <TableCell align="left">Ticket Price</TableCell>
                <TableCell align="left">Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MovieReservationList.slice(
                page * rowsPerPage,
                (page + 1) * rowsPerPage
              ).map((movieReservation) => (
                <TableRow
                  className={classes.tableRow}
                  hover
                  key={movieReservation._id}>
                  <TableCell className={classes.tableCell}>
                    {moment(movieReservation.startAt).format('YYYY MM DD HH:mm')}

                  </TableCell>
                  <TableCell className={classes.tableCell}>

                    {movieReservation.movieId.title}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {movieReservation.theaterId.theaterName}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {movieReservation.ticketPrice}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {movieReservation.totalPrice}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TablePagination
              backIconButtonProps={{
                'aria-label': 'Previous Page'
              }}
              component="div"
              count={MovieReservationList.length}
              nextIconButtonProps={{
                'aria-label': 'Next Page'
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Table>
        </PortletContent>
      </Portlet>
    </>
  );
};

MovieReservationListTable.defaultProps = {
  MovieReservationList: [],
  MovieList: [],
  TheaterList: [],
  onSelect: () => { },
  onShowDetails: () => { }
};

MovieReservationListTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onShowDetails: PropTypes.func,
  MovieReservationList: PropTypes.array
};

export default withStyles(styles)(MovieReservationListTable);
