import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Button, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import SearchInput from '../../../../../Components/SearchInput/Index';
import styles from './Styles';

const UsersToolbar = (props) => {
  const { classes, className, users, selectedUsers, deleteUser } = props;
  const rootClassName = classNames(classes.root, className);

  const onDeleteUser = (e) => {
    console.log('ondeleteUser');
    e.preventDefault();
    for (let i in selectedUsers) {
      const pickedUser = selectedUsers[i];
      const userToDelete = users.find((user) => user.username === pickedUser);
      deleteUser(userToDelete._id);
    }
  };

  return (
    <>
      <div className={rootClassName}>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search user"
          />

          <div>
            {selectedUsers.length >= 1 && (
              <IconButton
                className={classes.deleteButton}
                onClick={onDeleteUser}>
                <DeleteIcon />
              </IconButton>
            )}
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
