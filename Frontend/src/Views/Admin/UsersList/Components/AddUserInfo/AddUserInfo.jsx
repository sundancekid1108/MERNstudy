import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core';
import { Button, TextField, MenuItem } from '@material-ui/core';
import styles from './Styles';

const AddUserInfo = (props) => {
    const { classes, className, selectedUser } = props
    console.log("AdduserInfo", props)
    const rootClassName = classNames(classes.root, className);
    // const form = useRef();

    const dispatch = useDispatch();

    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        if(selectedUser !== undefined){
            setUserEmail(selectedUser.email);
            setUserName(selectedUser.username)
            setUserRole(selectedUser.role)
        }
    } ,[])


    //admin 기능 구현은 나중에
    const handleAdduUserInfo = () => {
        console.log("handleAdduUserInfo")
    }

    const handleUpdateUserInfo = ( ) => {
        console.log("handleUpdateUserInfo")
    }

    const title = selectedUser
      ? 'Edit UserInfo'
      : 'Add UserInfo';
    const submitButton = selectedUser
      ? 'Update UserInfo'
      : 'Save UserInfo';
    const submitAction = selectedUser
      ? () => handleUpdateUserInfo()
      : () => handleAdduUserInfo();

    return (
        <>
            <div className={rootClassName}>
                <Typography variant="h4" className={classes.title}>
                    {title}
                </Typography>
                <form autoComplete="off" noValidate>
                    <div className={classes.field}>
                        <TextField
                          fullWidth
                          className={classes.textField}
                          label="Username"
                          margin="dense"
                          required
                          value={userName}
                          variant="outlined"
                          onChange={event => setUserName(event.target.value)}
                        />
                        <TextField
                          fullWidth
                          className={classes.textField}
                          helperText="Please specify the First Name"
                          label="First Name"
                          margin="dense"
                          required
                          value={userFirstName}
                          variant="outlined"
                          onChange={event => setUserFirstName(event.target.value)}
                        />
                        <TextField
                          fullWidth
                          className={classes.textField}
                          helperText="Please specify the Last Name"
                          label="Last Name"
                          margin="dense"
                          required
                          value={userLastName}
                          variant="outlined"
                          onChange={event => setUserLastName(event.target.value)}
                        />

                    </div>
                    <div className={classes.field}>
                        <TextField
                          fullWidth
                          className={classes.textField}
                          label="Email"
                          margin="dense"
                          required
                          value={userEmail}
                          variant="outlined"
                          onChange={event => setUserEmail(event.target.value)}
                        />
                        <TextField
                          fullWidth
                          className={classes.textField}
                          label="Password"
                          margin="dense"
                          required
                          value={ userPassword}
                          variant="outlined"
                          onChange={event => setUserPassword(event.target.value)}
                        />
                    </div>
                    <div className={classes.field}>
                        <TextField
                          fullWidth
                          className={classes.textField}
                          label="Phone"
                          margin="dense"
                          required
                          value={userPhoneNumber}
                          variant="outlined"
                          onChange={event => setUserPhoneNumber(event.target.value)}

                        />
                        <TextField
                          fullWidth
                          select
                          className={classes.textField}
                          helperText="Admin or Guest"
                          label="Role"
                          margin="dense"
                          required
                          value={userRole}
                          variant="outlined"
                          onChange={event => setUserRole(event.target.value)}>
                            {['guest', 'admin', 'superadmin'].map(role => (
                              <MenuItem key={`role-${role}`} value={role}>
                                  {role}
                              </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </form>

                <Button
                  className={classes.buttonFooter}
                  color="primary"
                  variant="contained"
                  onClick={submitAction}>
                    {submitButton}
                </Button>
            </div>
        </>
    )
}

export default withStyles(styles)(AddUserInfo);