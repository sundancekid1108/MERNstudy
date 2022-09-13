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
  const [searchUserResult, setSearchUserResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [keyword, setKeyword] = useState('');
  const [limit, setLimit] = useState(10);

  const getUsersListTest = () => {
    dispatch(UserAction.getUserList())
  }

  const onChange = (event) => {
    setKeyword(event.target.value)
  }

  const handleUserSearch = (event) => {
    const match = (term, array, key) => {
      const reg = new RegExp(term.split('').join('.*'), 'i');
      // console.log(reg)
      return array.filter(item => item[key] && item[key].match(reg));
    };


    if (event.key === "Enter") {
      console.log(keyword,)
      const result = match(keyword, users, 'username')

      setSearchUserResult(result)
      console.log(searchUserResult)
    }

    else if (event.type === 'click') {
      console.log(keyword,)
      const result = match(keyword, users, 'username')

      setSearchUserResult(result)
      console.log(searchUserResult)
    }
  }




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
  // console.log("userTest", userTest)
  // console.log('selectedUsers', selectedUsers)

  const renderUserTable = () => {
    if (searchUserResult) {
      return <>
        <UsersTable handleSelect={handleSelectUser} users={searchUserResult} />
      </>
    } else if (users) {
      <UsersTable handleSelect={handleSelectUser} users={users} />
    } else {
      <Typography variant="h6">There are no users</Typography>
    }
  }

  return (
    <>
      <Dashboard title="Users">
        <div className={classes.root}>
          <UsersToolbar
            users={users}
            selectedUsers={selectedUsers}
            deleteUser={handleDeleteUsers}
            onChange={onChange} handleUserSearch={handleUserSearch} keyword={keyword}
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


            {renderUserTable()}
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
