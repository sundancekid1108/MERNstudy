import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  withStyles,
  Divider,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/DashboardOutlined";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasketOutlined";
import LockOpenIcon from "@material-ui/icons/LockOpenOutlined";
import ViewListIcon from "@material-ui/icons/ViewList";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import ImageIcon from "@material-ui/icons/ImageOutlined";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import AccountBoxIcon from "@material-ui/icons/AccountBoxOutlined";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import PersonIcon from "@material-ui/icons/Person";
import AvatarIMG from "../../../../Images/avatar.png";
import LogoIMG from "../../../../Images/logo.png";
import styles from "./Styles";

const Sidebar = (props) => {
  const { classes } = props;
  return (
    <section className={classes.root}>
      <div className={classes.logoWrapper}>
        <Link className={classes.logoLink} to="/">
          <img alt="Logo" className={classes.logoImage} />
        </Link>
      </div>
      <Divider className={classes.logoDivider} />
      <div className={classes.profile}>
        <Link to="/account">
          <Avatar alt=" test " className={classes.avatar} src={AvatarIMG} />
        </Link>
        <Typography className={classes.nameText} variant="h6">
          양원철
        </Typography>
        <Typography className={classes.bioText} variant="caption">
          취준생
        </Typography>
      </div>
      <Divider className={classes.profileDivider} />
      <List component="div" disablePadding>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/feed"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <ViewListIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Feed"
          />
        </ListItem>

        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/dashboard"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Dashboard"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/userslist"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Users"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/products"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <ShoppingBasketIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Products"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/signin"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <LockOpenIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Authentication"
          />
        </ListItem>

        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/account"
        >
          <ListItemIcon className={classes.listItemIcon}>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText
            classes={{ primary: classes.listItemText }}
            primary="Account"
          />
        </ListItem>
        <ListItem
          activeClassName={classes.activeListItem}
          className={classes.listItem}
          component={NavLink}
          to="/settings"
        >
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
        }
      >
        <ListItem
          className={classes.listItem}
          component="a"
          href="http://georgesimos.com"
          target="_blank"
        >
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
  );
};

export default withStyles(styles)(Sidebar);
