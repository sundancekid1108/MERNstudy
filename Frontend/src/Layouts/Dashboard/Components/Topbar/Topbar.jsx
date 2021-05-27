import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Badge, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";

import styles from "./Styles";

const Topbar = ({
  title,
  classes,
  ToolbarClasses,
  children,
  isSidebarOpen,
  onToggleSidebar,
}) => {
  return (
    <>
      <div className={`${classes.root} , ${ToolbarClasses}`}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            className={classes.menuButton}
            aria-label="Menu"
            onClick={onToggleSidebar}
          >
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.title}>
            {title}
          </Typography>
          <IconButton
            className={classes.notificationsButton}
            onClick={() => console.log("Notification")}
          >
            <Badge badgeContent={4} color="primary" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            onClick={() => console.log("Sign Out")}
          >
            <InputIcon />
          </IconButton>
        </Toolbar>
        {children}
      </div>
    </>
  );
};

export default withStyles(styles)(Topbar);
