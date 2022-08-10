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

const UpdateUserProfileImg = (props) => {
    const { user, classes, className, ...rest } = props;
    const rootClassName = classNames(classes.root, className);

    const [profileImg, setProfileImg] = useState(null)
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const onChangeProfileImg = (e) => {
        // console.log('e target file', e.target.files)
        const imgFile = e.target.files[0];
        setProfileImg(imgFile)
    }

    const handleUpdateProfieImg = async (e) => {
        if (!profileImg) {
            console.log("No Image")
            setErrorMessage("Select Profile Image")
        } else {

            console.log("handleUpdateProfieImg", profileImg)
            const formData = new FormData()
            formData.append("file", profileImg)
            // FormData의 key 확인
            for (let key of formData.keys()) {
                console.log("Key", key);
            }

            // FormData의 value 확인
            // for (let value of formData.values()) {
            //     console.log("Value", value);
            // }

            // const response = await userApi.updateProfileImg(formData)
            const response = await userApi.updateUserInfo(formData)
            console.log("response", response)
            setErrorMessage(response.data.response)
        }
    }

    const handleDeleteProfileImg = () => {
        const response = userApi.deleteProfileImg()
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
                        <form encType='multipart/form-data'>
                            <input type="file" name="file"
                                className={classes.input}
                                id="icon-button-file"
                                accept="image/*"
                                onChange={onChangeProfileImg}

                            />

                            <label htmlFor="icon-button-file">
                                <Button variant="outlined" className={classes.button} component="span">
                                    Upload
                                </Button>
                            </label>
                            <span>{profileImg ? profileImg.name : 'No file selected'}</span>
                        </form>

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
                            variant="outlined" className={classes.button} component="span"

                            disabled={!isValid}
                            onClick={handleUpdateProfieImg}
                        >
                            UPDATE PROFILE PICTURE
                        </Button>
                        <Button
                            variant="outlined" className={classes.button} component="span"

                            disabled={!isValid}
                            onClick={handleDeleteProfileImg}
                        >
                            DELETE PROFILE PICTURE
                        </Button>


                    </>




                )}
            </PortletFooter>
        </>
    )
}


export default withStyles(styles)(UpdateUserProfileImg);