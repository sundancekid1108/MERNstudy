import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Badge, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import * as userApi from '../../../../Api/UserApi/UserApi';
import styles from './Styles';

//Redux test
import { useDispatch, useSelector } from 'react-redux';
import * as AuthAction from '../../../../Store/Actions/AuthAction';
import { connect } from 'react-redux';

const Topbar = (props) => {
  // console.log('topbar props', props);
  const { classes, ToolbarClasses, children, isSidebarOpen, onToggleSidebar } =
    props;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);


  const handleLogOut = (e) => {
    dispatch(AuthAction.userLogOut());
    navigate('/signin');
  };

  const onChangeNotification = () => {
    console.log('Notification');
  };

  return (
    <>
      <div className={`${classes.root} , ${ToolbarClasses}`}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.brandWrapper}>
            <div className={classes.logo}>SundanceCinema</div>

            <IconButton
              className={classes.menuButton}
              aria-label="Menu"
              onClick={onToggleSidebar}>
              {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </div>
          <NavLink className={classes.title} to="/">
            Return
          </NavLink>
          <IconButton
            className={classes.notificationsButton}
            onClick={onChangeNotification}>
            <Badge badgeContent={4} color="primary" variant="dot" overlap="rectangular">
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
  // logout: PropTypes.func.isRequired,
  // auth: PropTypes.object.isRequired
};

export default withStyles(styles)(Topbar);
