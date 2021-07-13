import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { withStyles } from '@material-ui/core';
import { Avatar, Typography, Button } from '@material-ui/core';
import {
  Portlet,
  PortletContent,
  PortletFooter
} from '../../../../Components/Index';
import AvatarIMG from '../../../../Images/avatar.png';

// Component styles
import styles from './Styles';

const AccountProfile = (props) => {
  const { user, classes, className, ...rest } = props;
  // console.log('Account Profile user props', user);
  const rootClassName = classNames(classes.root, className);
  return (
    <>
      <Portlet {...rest} className={rootClassName}>
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <Typography variant="h2">
                {user.firstname + ' ' + user.lastname}
              </Typography>
              <Typography className={classes.emailText} variant="body1">
                {user.username}
              </Typography>
              <Typography className={classes.emailText} variant="body1">
                {user.email}
              </Typography>
            </div>
            <Avatar className={classes.avatar} src={AvatarIMG} />
          </div>
        </PortletContent>
        <PortletFooter>
          <Button
            className={classes.uploadButton}
            color="primary"
            variant="text">
            Upload picture
          </Button>
          <Button
            className={classes.uploadButton}
            color="primary"
            variant="text">
            Remove picture
          </Button>
          <Button
            className={classes.uploadButton}
            color="primary"
            variant="text">
            Edit Profile
          </Button>
          <Button
            className={classes.uploadButton}
            color="primary"
            variant="text">
            DELETE ACCOUNT
          </Button>
        </PortletFooter>
      </Portlet>
    </>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountProfile);
