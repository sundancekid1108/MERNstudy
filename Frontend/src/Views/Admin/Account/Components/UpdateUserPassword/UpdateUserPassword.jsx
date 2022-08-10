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

const UpdateUserPassword = (props) => {
    const { user, classes, className, ...rest } = props;
    // console.log('UpdateUserInfoUser : ', user);
    const rootClassName = classNames(classes.root, className);

    const [isLoading, setIsLoading] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPassword2, setUserPassword2] = useState('');
    const form = useRef();



    const handleUpdateUserPassword = async (e) => {
        e.preventDefault();
        console.log("handleUpdateUserPassword", userPassword, userPassword2)
        if(userPassword.length ==0  || userPassword2.length == 0){
            setErrorMessage("Check the Password Again")
        } else if (userPassword !== userPassword2) {
            setErrorMessage("Check the Password Again")
        } else {
            const body = { password1: userPassword, password2: userPassword2  }

            const result = await userApi.updateUserInfo(
              body
            );

            if(result.status == 400){

                setErrorMessage(result.data.response)
            }  else if (result.status == 200) {
                setErrorMessage(result.data.response)
            }
        }
    };



    return (
        <>
            <Portlet {...rest} className={rootClassName}>
                <PortletHeader>
                    <PortletLabel
                        subtitle="The information can be updated"
                        title="Password"
                    />
                </PortletHeader>
                <PortletContent noPadding>
                    <form ref={form} onSubmit={handleUpdateUserPassword} noValidate>
                        <div className={classes.field}>
                            <TextField
                                className={classes.textField}
                                label="Password"
                                margin="dense"
                                type="password"
                                value={userPassword}
                                variant="outlined"
                                onChange={event => setUserPassword(event.target.value)}
                            />
                            <TextField
                                className={classes.textField}
                                label="Check the Password"
                                margin="dense"
                                type="password"
                                value={userPassword2}
                                variant="outlined"
                                onChange={event => setUserPassword2(event.target.value)}
                            />
                        </div>
                    </form>
                </PortletContent>
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
                        <Button
                            color="primary"
                            variant="contained"
                            disabled={!isValid}
                            onClick={handleUpdateUserPassword}>
                            UPDATE PASSWORD
                        </Button>
                    )}
                </PortletFooter>
            </Portlet>
        </>
    );
};

UpdateUserPassword.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,

};

export default withStyles(styles)(UpdateUserPassword);
