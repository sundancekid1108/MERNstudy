import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { Divider, Typography } from "@material-ui/core";

// Component styles
const styles = (theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  company: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0.5),
  },
});

const Footer = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Divider />
      <Typography className={classes.company} variant="body1">
        &copy; Yang
      </Typography>
      <Typography variant="caption">Created By Yang</Typography>
    </div>
  );
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
