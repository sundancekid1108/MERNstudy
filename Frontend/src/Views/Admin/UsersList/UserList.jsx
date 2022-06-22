import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles, CircularProgress, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Dashboard from '../../../Layouts/Dashboard/Dashboard';
import { UsersTable, UsersToolbar } from './Components/Index';
import * as userApi from '../../../Api/UserApi/UserApi';
import * as UserAction from '../../../Store/Actions/UserAction'
import styles from './Styles';
import { getUserList } from '../../../Store/Actions/UserAction';


const UserList = (props) => {
  const { classes } = props;
  const dispatch = useDispatch();
  // const [signal, setSignal] = useState(true);
  // const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [limit, setLimit] = useState(10);

  const getUsersListTest = () => {
    dispatch(UserAction.getUserList())
  }


  // const getUsersList = async () => {
  //   try {
  //     const fetchedUsersList = await userApi.getUsersList();
  //     const result = fetchedUsersList;
  //     setUsers(result);
  //   } catch (error) {
  //     // console.log('error :', error);
  //     setErrorMessage(error);
  //   }
  // };

  const handleSelectUser = (selectedUsers) => {
    setSelectedUsers(selectedUsers);
  };

  const handleDeleteUsers = async (userId) => {
    try {
      const result = await userApi.deleteUserInfoByAdmin(userId);
      // console.log('handleDeleteUsers result : ', result);
      const data = users.filter((user) => user._id !== userId);
      // console.log('handleDeleteUsers', data);
      // setUsers(data);
      setSelectedUsers([]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getUsersList();
    getUsersListTest()
  }, [selectedUsers]);

  const users = useSelector((state) => state.users.users)
  const userTest = useSelector((state) => state.users.users)
  console.log("users", users)
  // console.log("userTest", userTest)
  console.log('selectedUsers', selectedUsers)
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
              <UsersTable handleSelect={handleSelectUser} users={users} />
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
