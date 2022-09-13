import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography, Avatar, withStyles } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import TheatersIcon from '@material-ui/icons/Theaters';
import styles from './Styles';


const TotalTheaterPage = (props) => {
    const { classes, className, theaterList } = props;


    const renderTotalUserPage = () => {
        if (theaterList) {
            return (<>
                <Card className={classnames(classes.root, className)}>
                    <CardContent>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Typography
                                    className={classes.title}
                                    color="textSecondary"
                                    gutterBottom
                                    variant="body2">
                                    TOTAL CINEMAS
                                </Typography>
                                <Typography variant="h3">{theaterList.length}</Typography>
                            </Grid>
                            <Grid item>
                                <Avatar className={classes.avatar}>
                                    <TheatersIcon className={classes.icon} />
                                </Avatar>
                            </Grid>
                        </Grid>
                        <div className={classes.difference}>
                            <ArrowDownwardIcon className={classes.differenceIcon} />
                            <Typography className={classes.differenceValue} variant="body2">
                                16%
                            </Typography>
                            <Typography className={classes.caption} variant="caption">
                                Since last month
                            </Typography>
                        </div>
                    </CardContent>
                </Card>

            </>)
        } else {
            return (<>
                <div>
                    TotalTheaterPage Error
                </div>
            </>)
        }
    }

    return (<>
        {renderTotalUserPage()}
    </>)
}

export default withStyles(styles)(TotalTheaterPage);
