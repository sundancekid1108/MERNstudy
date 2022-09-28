import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
import { useDispatch, useSelector } from 'react-redux';
import Portlet from '../../../../../Components/Portlet/Portlet'
import PortletContent from '../../../../../Components/PortletContent/PortletContent'
// import * as MovieReservationAction from '../../../../Store/Actions/MovieReservationAction'
import styles from './Styles';

const MyReservation = (props) => {
    const { classes, className, userMovieReservationList } = props;
    console.log("myreservation props", props)
    const rootClassName = classNames(classes.root, className);
    const dispatch = useDispatch()
    const getUserMovieReservationList = () => {
        // dispatch(MovieReservationAction.getUserMovieReservationList())
    }

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


    useEffect(() => {
        getUserMovieReservationList()
    }, [])
    return (<>
        <Portlet className={rootClassName}>
            <PortletContent noPadding>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Movie</TableCell>
                            <TableCell align="left">Theater</TableCell>
                            <TableCell align="left">Start At</TableCell>
                            <TableCell align="left">Ticket Price</TableCell>
                            <TableCell align="left">Total Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userMovieReservationList.slice(
                          page * rowsPerPage,
                          (page + 1) * rowsPerPage
                        ).map((userMovieReservation) =>(
                          <TableRow
                            className={classes.tableRow}
                            hover
                            key={userMovieReservation._id}
                          >
                              <TableCell className={classes.tableCell}>
                                  {userMovieReservation.movieId.title}

                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                  {userMovieReservation.theaterId.theaterName}
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                  {moment(userMovieReservation.startAt).format('YYYY-MM-DD HH:mm')}

                              </TableCell>
                              <TableCell className={classes.tableCell}>
                              {userMovieReservation.ticketPrice}
                          </TableCell>
                              <TableCell className={classes.tableCell}>
                                  {userMovieReservation.totalPrice}
                              </TableCell>

                          </TableRow>
                        )) }
                    </TableBody>
                    <TablePagination
                        backIconButtonProps={{
                            'aria-label': 'Previous Page'
                        }}
                        component="div"
                        count={userMovieReservationList.length}
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
    </>)

}


export default withStyles(styles)(MyReservation);