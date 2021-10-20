import React, { useState, useEffect } from 'react';
import { withStyles, CircularProgress, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Dashboard from '../../Layouts/Dashboard/Dashboard';
import { UsersTable, UsersToolbar } from './Components/Index';
import * as userApi from '../../Api/UserApi/UserApi';
import styles from './Styles';

const UserList = (props) => {
  const { classes } = props;
  // const [signal, setSignal] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [limit, setLimit] = useState(10);

  const getUsersList = async () => {
    try {
      const fetchedUsersList = await userApi.getUsersList();
      const result = fetchedUsersList;
      console.log('result :', result);
      setUsers(result);
    } catch (error) {
      console.log('error :', error);
      setErrorMessage(error);
    }
  };

  const handleSelectUser = (selectedUsers) => {
    setSelectedUsers(selectedUsers);
  };

  const handleDeleteUsers = async (userId) => {
    try {
      const result = await userApi.deleteUserInfoByAdmin(userId);
      // console.log('handleDeleteUsers result : ', result);
      const data = users.filter((user) => user._id !== userId);
      // console.log('handleDeleteUsers', data);
      setUsers(data);
      setSelectedUsers([]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersList();
  }, [selectedUsers]);

  return (
    <>
      <Dashboard title="Users">
        <div className={classes.root}>
          <UsersToolbar
            users={users}
            selectedUsers={selectedUsers}
            deleteUser={handleDeleteUsers}
          />
          <div className={classes.content}>
            {/* loading */}
            {isLoading ? (
              <div className={classes.progressWrapper}>
                <CircularProgress />
              </div>
            ) : (
              <div />
            )}
            {/* Error */}
            {errorMessage && (
              <Typography variant="h6">{errorMessage}</Typography>
            )}

            {/* Userlist 랜더링 */}
            {!users ? (
              <Typography variant="h6">There are no users</Typography>
            ) : (
              <UsersTable onSelect={handleSelectUser} users={users} />
            )}
          </div>
        </div>
      </Dashboard>
    </>
  );
};

UserList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserList);
