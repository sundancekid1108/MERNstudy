import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Drawer } from '@material-ui/core';
import Topbar from './Components/Topbar/Index';
import Footer from './Components/Footer/Index';
import Sidebar from './Components/Sidebar/Index';

import styles from './Styles';
import { RestoreTwoTone } from '@material-ui/icons';

const Dashboard = (props) => {
  const { title, children, classes } = props;

  const [isOpen, setIsOpen] = useState(true);

  const handleToggleOpen = () => {
    if (isOpen == false) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  // console.log('children', children);

  return (
    <>
      <Topbar
        title={title}
        ToolbarClasses={classes.topbar}
        isSidebarOpen={isOpen}
        onToggleSidebar={handleToggleOpen}
      />
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
        open={isOpen}
        onClose={handleToggleOpen}
        variant="persistent">
        <Sidebar className={classes.sidebar} />
      </Drawer>
      <main
        className={classNames({
          [classes.contentShift]: isOpen,
          [classes.content]: true
        })}>
        {children}
        <Footer />
      </main>
    </>
  );
};

Dashboard.defaultProps = {
  isSidebarOpen: false
};

Dashboard.propTypes = {
  children: PropTypes.node,
  isSidebarOpen: PropTypes.bool,
  title: PropTypes.string
};

export default withStyles(styles)(Dashboard);
