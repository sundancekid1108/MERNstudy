import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { withStyles, Button, Typography } from '@material-ui/core';
import classnames from 'classnames';
import styles from './Styles';
import logoImg from '../../../../Images/logo.jpg';

const Navbar = (props) => {
  const { classes, isAuth } = props;
  console.log('isAuth', isAuth);
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const onclickEvent = (e) => {
    e.preventDefault();
    history.push('/signin');
  };

  const handleShowMenu = (e) => {
    if (showMenu == false) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  };

  return (
    <>
      <nav className={classes.navbar}>
        <Link className={classes.logoLink} to="/">
          <Typography className={classes.logoImage} variant="h2">
            SundanceCinema
          </Typography>
        </Link>
        {/* <div className={classes.navLinks}>
          <Link className={classes.navLink} to="/admin/userslist">
            Users
          </Link>
          <Link className={classes.navLink} to="/admin/account">
            Account
          </Link>
          <Link className={classes.navLink} to="/admin/dashboard">
            Dashboard
          </Link>
          <Link className={classes.navLink} to="/signin">
            Login
          </Link>
        </div> */}
        <div className={classes.navBtn} onClick={handleShowMenu}>
          <div className={classes.navIcon}>
            <div
              className={classnames(
                classes.navIconLine,
                classes.navIconLine__left
              )}
            />
            <div className={classes.navIconLine} />
            <div
              className={classnames(
                classes.navIconLine,
                classes.navIconLine__right
              )}
            />
          </div>
        </div>
      </nav>
      <div
        className={classnames({
          [classes.navActive]: showMenu,
          [classes.nav]: true
        })}>
        <div className={classes.navContent}>
          <div className={classes.currentPageShadow}>Movies</div>
          <ul className={classes.innerNav}>
            <li className={classes.innerNavListItem}>
              <Link className={classes.innerNavLink} to="/">
                Home
              </Link>
            </li>
            {isAuth && (
              <li className={classes.innerNavListItem}>
                <Link className={classes.innerNavLink} to="/admin/dashboard">
                  Dashboard
                </Link>
              </li>
            )}
            <li className={classes.innerNavListItem}>
              <Link className={classes.innerNavLink} to="/movies">
                Movies
              </Link>
            </li>
            {!isAuth && (
              <li className={classes.innerNavListItem}>
                <Link className={classes.innerNavLink} to="/signin">
                  SignIn
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default withStyles(styles)(Navbar);
