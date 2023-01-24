import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Typography, List, ListItem, Button, withStyles } from '@material-ui/core';
import classnames from 'classnames';
import styles from './Styles';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthAction from '../../../../Store/Actions/AuthAction';
import UserPopover from './Components/UserPopover/UserPopover'
import logoImg from '../../../../Images/logo.jpg';

const Navbar = (props) => {
  const { classes } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPosition, setScrollPositon] = useState(0);

  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const onclickEvent = (e) => {
    e.preventDefault();
    navigate('/signin');
  };

  const handleLogOut = (e) => {
    dispatch(AuthAction.userLogOut());

    navigate('/signin', { replace: false });
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
          [classes.navbarColor]: scrollPosition > 50
        })}>
        <Link className={classes.logoLink} to="/">
          <Typography className={classes.logo} variant="h2">
            SundanceCinema
          </Typography>
        </Link>
        <div className={classes.navLinks}>
          <Link className={classes.navLink} to="/">
            Home
          </Link>
          <Link className={classes.navLink} to="/movie/category/latestmovies">
            Latest Movies
          </Link>
          <Link className={classes.navLink} to="/movie/category/nowShowing">
            Now Showing
          </Link>
          <Link className={classes.navLink} to="/movie/category/comingSoon">
            Coming Soon
          </Link>

          <Link className={classes.navLink} to="/theaters">
            Theaters
          </Link>

          {isAuth && (
            user.isAdmin ? (

                <Link className={classes.navLink} to="/admin/dashboard">
                  Admin Dashboard
                </Link>

            ) : (

                <Link className={classes.navLink} to="/userdashboard">
                  Dashboard
                </Link>

            )
          )}



        </div>

        <div className={classes.navAccount}>
          <UserPopover logout={handleLogOut}>
            <List component="nav">
              {isAuth && (
                user.isAdmin ? (
                  <ListItem>
                    <Link className={classes.navLink} to="/admin/dashboard">
                      Admin Dashboard
                    </Link>
                  </ListItem>
                ) : (
                  <ListItem>
                    <Link className={classes.navLink} to="/userdashboard">
                      Dashboard
                    </Link>
                  </ListItem>
                )
              )}

              {isAuth ? (
                <ListItem>
                  <Link className={classes.navLink} onClick={handleLogOut} to="/">
                    Logout
                  </Link>
                </ListItem>
              ) : (
                <ListItem>
                  <Link className={classes.navLink} to="/signin">
                    Login
                  </Link>
                </ListItem>
              )}
            </List>
          </UserPopover>
        </div>


        {/* 햄버거 메뉴 */}
        <div className={classes.navMobile} onClick={handleShowMenu}>
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
            {/* {isAuth && (
              <>
                {user.isAdmin && (
                  <li className={classes.innerNavListItem}>
                    <Link className={classes.innerNavLink} to="/admin/dashboard">
                      Dashboard
                    </Link>
                  </li>
                )}

                <li className={classes.innerNavListItem}>
                  <Link
                    className={classes.innerNavLink}
                    onClick={handleLogOut}
                    to="/">
                    Logout
                  </Link>
                </li>
              </>

            )} */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default withStyles(styles)(Navbar);
