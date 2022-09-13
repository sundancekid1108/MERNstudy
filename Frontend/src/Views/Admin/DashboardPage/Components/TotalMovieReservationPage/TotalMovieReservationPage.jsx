import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography, Avatar, withStyles } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import styles from './Styles'

const TotalMovieReservationPage = (props) => {
    const { classes, className, movieReservationsList } = props;


    const renderTotalMovieReservationPage = () => {
        if (movieReservationsList) {
            return (<>
                <Card className={classnames(classes.root, className)}>
                    <CardContent>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Typography
                                    className={classes.title}
                                    color="inherit"
                                    gutterBottom
                                    variant="body2">
                                    TOTAL MOVIE RESERVATIONS
                                </Typography>
                                <Typography color="inherit" variant="h3">
                                    {movieReservationsList.length}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Avatar className={classes.avatar}>
                                    <EventIcon className={classes.icon} />
                                </Avatar>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

            </>)
        } else {
            return (<>
                <div>
                    TotalMovieReservationPage Error
                </div>
            </>)
        }
    }

    return (<>
        {renderTotalMovieReservationPage()}

    </>)
}


export default withStyles(styles)(TotalMovieReservationPage);