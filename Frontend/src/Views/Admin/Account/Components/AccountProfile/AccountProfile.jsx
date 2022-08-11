import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { withStyles } from '@material-ui/core';
import { Avatar, Typography, Button } from '@material-ui/core';
import {
  Portlet,
  PortletContent,
  PortletFooter,
  ResponsiveDialog
} from '../../../../../Components/Index';
import AvatarIMG from '../../../../../Images/avatar.png';

// Component styles
import styles from './Styles';
import { useNavigate } from 'react-router-dom';
import UpdateUserProfileImg from '../UpdateUserProfileImg/UpdateUserProfileImg';
import UpdateUserInfo from '../UpdateUserInfo/UpdateUserInfo';
import UpdateUserPassword from '../UpdateUserPassword/UpdateUserPassword'

import FileUpload from '../../../../../Components/FileUpload/FileUpload';


const AccountProfile = (props) => {
  const { user, classes, className } = props;

  // console.log('Account Profile user props', user);
  const rootClassName = classNames(classes.root, className);

  const [isOpenUpdateUserInfo, setIsOpenUpdateUserInfo] = useState(false);
  const [isOpenUpdateUserProfileImg, setIsOpenUpdateUserProfileImg] = useState(false);
  const [isOpenUpdateUserPassword, setIsOpenUpdateUserPassword] = useState(false);
  //popup dialog 열고 닫기


  const handleUpdateUserProfileImg = () => {
    if (isOpenUpdateUserProfileImg === false) {
      setIsOpenUpdateUserProfileImg(true);
    } else {
      setIsOpenUpdateUserProfileImg(false);

    }
  }
  const handleUpdateUserInfo = () => {
    console.log("handleUpdateUserInfo")
    if (isOpenUpdateUserInfo === false) {
      setIsOpenUpdateUserInfo(true);
    } else {
      setIsOpenUpdateUserInfo(false);

    }
  }

  const handleUpdateUserPassword = () => {
    console.log("handleUpdateUserPassword")
    if (isOpenUpdateUserPassword === false) {
      setIsOpenUpdateUserPassword(true);
    } else {
      setIsOpenUpdateUserPassword(false);

    }
  }
  const handleDeleteAccount = () => {
    console.log("handleDeleteAccount")
  }

  return (
    <>
      <Portlet className={rootClassName}>
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <Typography variant="h2">{user.name}</Typography>
              <Typography className={classes.emailText} variant="body1">
                {user.userName}
              </Typography>
              <Typography className={classes.emailText} variant="body1">
                {user.userEmail}
              </Typography>
            </div>
            <Avatar className={classes.avatar}
              src={user.profileImg ? user.profileImg : AvatarIMG}
            />
          </div>
        </PortletContent>
        <PortletFooter>
          <Button
            className={classes.uploadButton}
            color="primary"
            onClick={handleUpdateUserProfileImg}
            variant="text">
            Upload picture
          </Button>

          <ResponsiveDialog
            open={isOpenUpdateUserProfileImg}
            handleClose={handleUpdateUserProfileImg}
          >
            <UpdateUserProfileImg />
          </ResponsiveDialog>

          <Button
            className={classes.uploadButton}
            color="primary"
            onClick={handleUpdateUserInfo}
            variant="text">
            Update Profile
          </Button>
          <ResponsiveDialog
            open={isOpenUpdateUserInfo}
            handleClose={handleUpdateUserInfo}
          >
            <UpdateUserInfo user={user} />
          </ResponsiveDialog>
          <Button
            className={classes.uploadButton}
            onClick={handleUpdateUserPassword}
            color="primary"
            variant="text">
            Update Password
          </Button>
          <ResponsiveDialog
            open={isOpenUpdateUserPassword}
            handleClose={handleUpdateUserPassword}
          >
            <UpdateUserPassword />
          </ResponsiveDialog>
          <Button
            className={classes.uploadButton}

            onClick={handleDeleteAccount}
            color="primary"
            variant="text">
            DELETE ACCOUNT

          </Button>
        </PortletFooter>
      </Portlet>
    </>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountProfile);
