import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Divider, Typography } from '@material-ui/core';
import styles from './Styles';
// Component styles

const Footer = (props) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Divider />
            <Typography className={classes.company} variant="body1">
                &copy; Yang
            </Typography>
            {/* <Typography variant="caption">User Page</Typography> */}
        </div>
    );
};

Footer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
