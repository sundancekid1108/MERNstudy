import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Drawer } from "@material-ui/core";
import Topbar from "./Components/Topbar/Topbar";
import Footer from "./Components/Footer/Footer";
import Sidebar from "./Components/Sidebar/Sidebar";

import styles from "./Styles";

const Dashboard = ({ title, children, classes }) => {
  const [isOpen, setIsOpen] = useState("false");

  const handleToggleOpen = () => {
    setIsOpen("true");
  };

  const handleClose = () => {
    setIsOpen("false");
  };
  return (
    <>
      <Topbar
        title={title}
        ToolbarClasses={`${classes.topbar}, ${isOpen && classes.topbarShift}`}
        isSidebarOpen={isOpen}
        onToggleSidebar={handleToggleOpen}
      />
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        open={isOpen}
        onClose={handleClose}
        variant="persistent"
      >
        <Sidebar className={classes.sidebar} />
      </Drawer>
      <main className={`${classes.root}, ${isOpen && classes.contentShift}`}>
        {children}
        <Footer />
      </main>
    </>
  );
};

export default withStyles(styles)(Dashboard);
