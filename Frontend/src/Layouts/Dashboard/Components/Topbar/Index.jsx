import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Badge, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import * as userApi from '../../../../Api/UserApi/UserApi';

import styles from './Styles';

const Topbar = (props) => {
  const {
    title,
    classes,
    ToolbarClasses,
    children,
    isSidebarOpen,
    onToggleSidebar
  } = props;

  const history = useHistory();

  const handleLogOut = async () => {
    await userApi.userLogout();
    history.push('/signin');
  };

  const onChangeNotification = () => {
    console.log('Notification');
  };

  return (
    <>
      <div className={`${classes.root} , ${ToolbarClasses}`}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            className={classes.menuButton}
            aria-label="Menu"
            onClick={onToggleSidebar}>
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.title}>
            {title}
          </Typography>
          <IconButton
            className={classes.notificationsButton}
            onClick={onChangeNotification}>
            <Badge badgeContent={4} color="primary" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton className={classes.signOutButton} onClick={handleLogOut}>
            <InputIcon />
          </IconButton>
        </Toolbar>
        {children}
      </div>
    </>
  );
};

Topbar.defaultProps = {
  title: 'Dashboard',
  isSidebarOpen: false
};

Topbar.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool,
  title: PropTypes.string
};

export default withStyles(styles)(Topbar);
