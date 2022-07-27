import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import {
    Button,
    TextField,
    CircularProgress,
    Typography
} from '@material-ui/core';
import {
    Portlet,
    PortletHeader,
    PortletLabel,
    PortletContent,
    PortletFooter
} from '../../../../../Components/Index';
import * as userApi from '../../../../../Api/UserApi/UserApi';

import styles from './Styles';

const UpdateUserInfo = (props) => {
    const { user, classes, className, ...rest } = props;
    const rootClassName = classNames(classes.root, className);

    const [profilePicImg, setProfilePicImg] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const onChangeTest = (e) => {
        const imgFile = e.target.files[0];
        setProfilePicImg(imgFile)
        console.log(profilePicImg)
    }

    const handleUpdateProfiePic = () => {
        if (!profilePicImg) {
            console.log("No Image")
        } else {
            console.log("handleUpdateProfiePic", profilePicImg)
        }
    }

    const handleDeleteProfilePic = () => {
        console.log("Delete ProfilePic")
    }

    return (
        <>
            <Portlet {...rest} className={rootClassName}>
                <PortletHeader>
                    <PortletLabel
                        subtitle="Upload your Porfile Picture"
                        title="Profile Picture"
                    />

                </PortletHeader>
                <PortletContent noPadding>
                    <div className={classes.field}>
                        <input type="file" name="file" onChange={onChangeTest} />
                    </div>
                </PortletContent>
            </Portlet>
            <PortletFooter className={classes.portletFooter}>
                {errorMessage && (
                    <Typography className={classes.errorMessage} variant="body2">
                        {errorMessage}
                    </Typography>
                )}
                {/* Loding bar */}
                {isLoading ? (
                    <CircularProgress className={classes.progress} />
                ) : (
                    <>
                        <Button
                            className={classes.buttonFooter}
                            color="primary"
                            variant="contained"
                            disabled={!isValid}
                            onClick={handleUpdateProfiePic}
                        >
                            UPDATE PROFILE PICTURE
                        </Button>
                        <Button
                            className={classes.buttonFooter}
                            color="primary"
                            variant="contained"
                            disabled={!isValid}
                            onClick={handleUpdateProfiePic}
                        >
                            DELETE PROFILE PICTURE
                        </Button>


                    </>




                )}
            </PortletFooter>
        </>
    )
}


export default withStyles(styles)(UpdateUserInfo);