import React from 'react';
import { createBrowserHistory } from 'history';

import { Link } from 'react-router-dom';
import { withStyles, Button } from '@material-ui/core';
// import history from '../../../../utils/history';
// Component styles
import styles from './Styles';
import logoImg from '../../../../Images/logo.jpg';

const Navbar = (props) => {
  const { classes } = props;
  const history = createBrowserHistory();

  return (
    <>
      <nav className={classes.navbar}>
        <Link className={classes.logoLink} to="/dashboard">
          <img
            className={classes.logoImage}
            alt="Logo"
            //   src={logoImg}
          />
        </Link>
        <div className={classes.navLinks}>
          <Link className={classes.navLink} to="/admin/userslist">
            Users
          </Link>
          <Link className={classes.navLink} to="/admin/account">
            Account
          </Link>
          <Link className={classes.navLink} to="/admin/dashboard">
            Dashboard
          </Link>
        </div>

        <Button
          color="primary"
          variant="contained"
          onClick={() => history.push('/signin')}>
          SignIn
        </Button>
      </nav>
    </>
  );
};

export default withStyles(styles)(Navbar);
