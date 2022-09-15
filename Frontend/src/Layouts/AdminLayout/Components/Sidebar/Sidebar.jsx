import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import {
  withStyles,
  Divider,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import MovieIcon from '@material-ui/icons/Movie';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasketOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import ViewListIcon from '@material-ui/icons/ViewList';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import AccountBoxIcon from '@material-ui/icons/AccountBoxOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import PersonIcon from '@material-ui/icons/Person';
import AvatarIMG from '../../../../Images/avatar.png';
import LogoIMG from '../../../../Images/logo.jpg';
import styles from './Styles';

const Sidebar = (props) => {
  // console.log('sidebar props', props);

  const { classes, user } = props;
  const userInfo = useSelector((state) => state.auth.user);
  // console.log("sidebar userInfo", userInfo)

  if (userInfo.isAdmin) {
    return (
      <>
        <section className={classes.root}>
          <List component="div" disablePadding>
            <ListItem
              activeclassname={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/admin/movies">
              <ListItemIcon className={classes.listItemIcon}>
                <MovieIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Movies"
              />
            </ListItem>
            {/* <ListItem
              activeclassname={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/feed">
              <ListItemIcon className={classes.listItemIcon}>
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Feed"
              />
            </ListItem> */}
            <ListItem
              activeclassname={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/admin/dashboard">
              <ListItemIcon className={classes.listItemIcon}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Dashboard"
              />
            </ListItem>

            <ListItem
              activeclassname={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/admin/tmdbmovie">
              <ListItemIcon className={classes.listItemIcon}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="TMDB Moives"
              />
            </ListItem>


            <ListItem
              activeclassname={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/admin/theaters">
              <ListItemIcon className={classes.listItemIcon}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Theaters"
              />
            </ListItem>
            <ListItem
              activeclassname={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/admin/reservation">
              <ListItemIcon className={classes.listItemIcon}>
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Movie Reservations"
              />
            </ListItem>
            <ListItem
              activeclassname={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/admin/movieshowtimes">
              <ListItemIcon className={classes.listItemIcon}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="MovieShowTimes"
              />
            </ListItem>
            <ListItem
              activeclassname={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/admin/userslist">
              <ListItemIcon className={classes.listItemIcon}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Users"
              />
            </ListItem>

            <ListItem
              activeclassname={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/admin/account">
              <ListItemIcon className={classes.listItemIcon}>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Account"
              />
            </ListItem>
            <ListItem
              activeclassname={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/admin/settings">
              <ListItemIcon className={classes.listItemIcon}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Settings"
              />
            </ListItem>
          </List>
          <Divider className={classes.listDivider} />
          <List
            component="div"
            disablePadding
            subheader={
              <ListSubheader className={classes.listSubheader}>
                Support
              </ListSubheader>
            }>
            <ListItem className={classes.listItem} component="a" target="_blank">
              <ListItemIcon className={classes.listItemIcon}>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Customer support"
              />
            </ListItem>
          </List>
        </section>
      </>
    )
  } else {
    return (
      <>
        <section className={classes.root}>
          <List component="div" disablePadding>

            <ListItem
              activeclassname={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/feed">
              <ListItemIcon className={classes.listItemIcon}>
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Feed"
              />
            </ListItem>






            <ListItem
              activeclassname={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/admin/account">
              <ListItemIcon className={classes.listItemIcon}>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Account"
              />
            </ListItem>
            <ListItem
              activeclassname={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/admin/settings">
              <ListItemIcon className={classes.listItemIcon}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.listItemText }}
                primary="Settings"
              />
            </ListItem>
          </List>
          <Divider className={classes.listDivider} />

        </section>
      </>
    )
  }

};

export default withStyles(styles)(Sidebar);
