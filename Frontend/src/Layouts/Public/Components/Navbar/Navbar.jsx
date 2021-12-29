import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { withStyles, Button, Typography } from '@material-ui/core';
import classnames from 'classnames';
import styles from './Styles';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthActions from '../../../../Store/Actions/AuthActions';
import logoImg from '../../../../Images/logo.jpg';

const Navbar = (props) => {
  const { classes } = props;

  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPosition, setScrollPositon] = useState(0);

  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const onclickEvent = (e) => {
    e.preventDefault();
    history.push('/signin');
  };

  const handleLogOut = (e) => {
    dispatch(AuthActions.userLogOut());

    history.push('/signin');
  };

  const handleShowMenu = (e) => {
    if (showMenu == false) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  };

  //스크롤 위치에 따라 navbar 투명도 조절해주는것..
  //hooks에서 componentWillUnmount처리할때 useEffect안에서 return으로 처리
  useEffect(() => {
    const handleScrollPositon = () => {
      setScrollPositon(window.pageYOffset);
      // console.log('scrollPosition', scrollPosition);
    };
    window.addEventListener('scroll', handleScrollPositon);
    return () => window.removeEventListener('scroll', handleScrollPositon);
  }, []);

  return (
    <>
      <nav
        className={classnames({
          [classes.navbar]: true,
          [classes.navbarColor]: scrollPosition > 100
        })}>
        <Link className={classes.logoLink} to="/">
          <Typography className={classes.logo} variant="h2">
            SundanceCinema
          </Typography>
        </Link>
        <div className={classes.navLinks}>
          {}
          <Link className={classes.navLink} to="/movie/category/latestmovies">
            Latest Movies
          </Link>
          <Link className={classes.navLink} to="/admin/userslist">
            Users
          </Link>
          <Link className={classes.navLink} to="/admin/account">
            Account
          </Link>
          <Link className={classes.navLink} to="/admin/dashboard">
            Dashboard
          </Link>
          <Link className={classes.navLink} to="/theaters">
            Theaters
          </Link>
          {!isAuth && (
            <Link className={classes.navLink} to="/signin">
              Sign In
            </Link>
          )}
          {isAuth && (
            <Link className={classes.navLink} onClick={handleLogOut} to="/">
              Log Out
            </Link>
          )}
        </div>
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
        onClick={handleShowMenu}
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
            {isAuth && (
              <li className={classes.innerNavListItem}>
                <Link
                  className={classes.innerNavLink}
                  onClick={handleLogOut}
                  to="/">
                  Logout
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
