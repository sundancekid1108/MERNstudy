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
import PropTypes from 'prop-types';
import { Portlet, PortletContent } from '../../../../../Components/Index';
import styles from './Styles';

const MovieReservationListTable = (props) => {
  console.log(props);
  const { classes, className, MovieReservationList } = props;
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

  return (
    <>
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Start At</TableCell>
                <TableCell align="left">Movie</TableCell>
                <TableCell align="left">Cinema</TableCell>
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
                    {movieReservation.startAt}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {movieReservation.movieId}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {movieReservation.theaterId}
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
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
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
  onSelect: () => {},
  onShowDetails: () => {}
};

MovieReservationListTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onShowDetails: PropTypes.func,
  MovieReservationList: PropTypes.array
};

export default withStyles(styles)(MovieReservationListTable);
