import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Button, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import SearchInput from '../../../../../Components/SearchInput/SearchInput';
import ResponsiveDialog from '../../../../../Components/ResponsiveDialog/ResponsiveDialog';
import AddUserInfo from '../AddUserInfo/AddUserInfo'
import styles from './Styles';

const UsersToolbar = (props) => {
  const { classes, className, users, selectedUsers, deleteUser, handleUserSearch, onChange, keyword } = props;
  const rootClassName = classNames(classes.root, className);
  const [isOpenAddDialog, setIsOpenAddDialog] = useState(false);
  const [editUserInfo, setEditUserInfo] = useState(null)

  const handleDeleteUser = (e) => {
    for (let i in selectedUsers) {
      const pickedUser = selectedUsers[i];

      deleteUser(pickedUser._id)
    }
  };

  const handleCreateDialog = () => {
    if (isOpenAddDialog === false) {
      setIsOpenAddDialog(true);
    } else {
      setIsOpenAddDialog(false);
    }
  };

  const handleEditUserInfo = (userInfo) => {
    console.log("handleEditUserInfo")
    if (isOpenAddDialog === false) {
      setIsOpenAddDialog(true);
    } else {
      setIsOpenAddDialog(false);

    }
  }

  const handleCreateUserInfo = (e) => {
    console.log("handleCreateUserInfo")
    setEditUserInfo(null)
    if (isOpenAddDialog === false) {
      setIsOpenAddDialog(true);
    } else {
      setIsOpenAddDialog(false);
    }
  }

  const renderButton = () => {
    if (selectedUsers.length === 1) {
      return <Button color="primary" size="small" variant="outlined"
        onClick={() => handleEditUserInfo(selectedUsers)}> Edit</Button>
    } else if (selectedUsers.length > 1) {
      return null
    } else {
      return <Button color="primary" size="small" variant="outlined"
        onClick={handleCreateUserInfo}> Add </Button>
    }
  }


  return (
    <>
      <div className={rootClassName}>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search user"
            onChange={onChange}
            value={keyword}
            onKeyPress={handleUserSearch}
            onClick={handleUserSearch}
          />

          <div>
            {selectedUsers.length >= 1 && (
              <IconButton
                className={classes.deleteButton}
                onClick={handleDeleteUser}>
                <DeleteIcon />
              </IconButton>
            )}
            {renderButton()}
            <ResponsiveDialog
              id="Add_UserInfo"
              open={isOpenAddDialog}
              handleClose={handleCreateDialog}

            >
              <AddUserInfo selectedUser={selectedUsers[0]} />
            </ResponsiveDialog >
          </div>
        </div>
      </div>
    </>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  selectedUsers: PropTypes.array
};
UsersToolbar.defaultProps = {
  selectedUsers: []
};

export default withStyles(styles)(UsersToolbar);
