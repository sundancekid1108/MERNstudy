import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Card, CardContent, Grid, Typography, Avatar, withStyles } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import styles from './Styles';
const TotalUserPage = (props) => {
    const { classes, className, userList } = props;
    // console.log(userList)

    const renderTotalUserPage = () => {
        if (userList) {
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
                                    TOTAL USERS
                                </Typography>
                                <Typography variant="h3">{userList.length}</Typography>
                            </Grid>
                            <Grid item>
                                <Avatar className={classes.avatar}>
                                    <PeopleIcon className={classes.icon} />
                                </Avatar>
                            </Grid>
                        </Grid>
                        <div className={classes.difference}>
                            <ArrowUpwardIcon className={classes.differenceIcon} />
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
                    Noo
                </div>
            </>)
        }
    }

    return (<>
        {renderTotalUserPage()}
    </>)
}


export default withStyles(styles)(TotalUserPage);
