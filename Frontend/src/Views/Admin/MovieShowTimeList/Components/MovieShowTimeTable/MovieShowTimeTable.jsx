import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import {
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    TablePagination
} from '@material-ui/core';

import { Portlet, PortletContent } from '../../../../../Components/Index';
import styles from './Styles';

const MovieShowTimeTable = (props) => {
    const { className, classes, movieShowTimes, handleSelect
    } = props
    const rootClassName = classNames(classes.root, className);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedMovieShowTimes, setSelectedMovieShowTimes] = useState([]);

    const handleSelectAll = e => {
        let allSelectedData;
        if (e.target.checked) {
            allSelectedData = movieShowTimes.map((movieShowTime) => movieShowTime);
        } else {
            allSelectedData = [];
        }
        setSelectedMovieShowTimes(allSelectedData);
        handleSelect(allSelectedData);
    };

    const handleSelectOne = (e, selectedMovieShowTime) => {
        const selectedIndex = selectedMovieShowTimes.findIndex(i => i._id == selectedMovieShowTime._id);
        let selectedData = [];
        if (selectedIndex === -1) {
            selectedData = selectedData.concat(
                selectedMovieShowTimes,
                selectedMovieShowTime
            );
        } else if (selectedIndex === 0) {
            selectedData = selectedData.concat(
                selectedMovieShowTimes.slice(1)
            );
        } else if (selectedIndex === selectedMovieShowTimes.length - 1) {
            selectedData = selectedData.concat(
                selectedMovieShowTimes.slice(0, -1)
            );
        } else if (selectedIndex > 0) {
            selectedData = selectedData.concat(
                selectedMovieShowTimes.slice(0, selectedIndex),
                selectedMovieShowTimes.slice(selectedIndex + 1)
            );
        }

        setSelectedMovieShowTimes(selectedData)

        handleSelect(selectedData);
    };

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value);
        setPage(0);
    };


    return <>
        <Portlet className={rootClassName}>
            <PortletContent noPadding>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">
                                <Checkbox
                                    checked={selectedMovieShowTimes.length === 0 ? false : selectedMovieShowTimes.length === movieShowTimes.length ? true : false}
                                    color="primary"
                                    indeterminate={
                                        selectedMovieShowTimes.length > 0 &&
                                        selectedMovieShowTimes.length < movieShowTimes.length
                                    }
                                    onChange={handleSelectAll}
                                />
                                ID
                            </TableCell>
                            <TableCell align="left">Movie</TableCell>
                            <TableCell align="left">Theater</TableCell>
                            <TableCell align="left">Start Date</TableCell>
                            <TableCell align="left">End Date</TableCell>
                            <TableCell align="left">Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {movieShowTimes
                            .filter(movieShowTime => {
                                return movieShowTime;
                            })
                            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                            .map(movieShowTime => (
                                <TableRow
                                    className={classes.tableRow}
                                    hover
                                    key={movieShowTime._id}
                                    onClick={() => console.log("onclick!!")}
                                    selected={selectedMovieShowTimes.findIndex(i => i._id == movieShowTime._id) !== -1}>
                                    <TableCell className={classes.tableCell}>
                                        <div className={classes.tableCellInner}>
                                            <Checkbox
                                                checked={
                                                    selectedMovieShowTimes.findIndex(i => i._id == movieShowTime._id) !== -1
                                                }
                                                color="primary"
                                                onChange={e =>
                                                    handleSelectOne(e, movieShowTime)
                                                }
                                                value="true"
                                            />
                                            <Typography
                                                className={classes.nameText}
                                                variant="body1">
                                                {movieShowTime._id}
                                            </Typography>
                                        </div>
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {movieShowTime.movieId.title}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {movieShowTime.theaterId.theaterName}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {moment(movieShowTime.startDate).format('YYYY/DD/MM')}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {moment(movieShowTime.endDate).format('YYYY/DD/MM')}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {moment(movieShowTime.startAt).format('YYYY MM DD HH:mm')}

                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    backIconButtonProps={{
                        'aria-label': 'Previous Page'
                    }}
                    component="div"
                    count={movieShowTimes.length}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page'
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </PortletContent>
        </Portlet>
    </>

}

MovieShowTimeTable.defaultProps = {
    movieShowTimes: [],
    handleSelect: () => { },
    onShowDetails: () => { }
};

MovieShowTimeTable.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    handleSelect: PropTypes.func,
    onShowDetails: PropTypes.func,
    movieShowTimes: PropTypes.array.isRequired
};


export default withStyles(styles)(MovieShowTimeTable);

