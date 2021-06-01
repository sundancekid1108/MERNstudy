import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import moment from "moment";
import { withStyles } from "@material-ui/core";
import { Avatar, Typography, Button } from "@material-ui/core";
import {
  Portlet,
  PortletContent,
  PortletFooter,
} from "../../../../Components/Index";

// Component styles
import styles from "./Styles";

const AccountProfile = (props) => {
  const { user, classes, className, ...rest } = props;
  const rootClassName = classNames(classes.root, className);
  return (
    <>
      <Portlet {...rest} className={rootClassName}>
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <Typography variant="h2">
                {user.firstname + " " + user.lastname}
              </Typography>
              <Typography className={classes.emailText} variant="body1">
                {user.email}
              </Typography>
              <Typography className={classes.dateText} variant="body1">
                Join at: {moment(user.createdAt).format("MM/DD/YYYY")}
              </Typography>
            </div>
            <Avatar
              className={classes.avatar}
              src="/images/avatars/avatar.png"
            />
          </div>
        </PortletContent>
        <PortletFooter>
          <Button
            className={classes.uploadButton}
            color="primary"
            variant="text"
          >
            Upload picture
          </Button>
          <Button variant="text">Remove picture</Button>
        </PortletFooter>
      </Portlet>
    </>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountProfile);
