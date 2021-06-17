import React, { useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import {
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';
import Portlet from '../../../../Components/Portlet/Index';
import PortletContent from '../../../../Components/PortletContent/Index';
import styles from './Styles';

const UsersTable = (props) => {
  console.log('UserTable props :', props);
  const { classes, className, users, onSelect, onShowDetails } = props;
  const rootClassName = classNames(classes.root, className);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSelectAll = (e) => {
    console.log('handleselectall');
    console.log(e.target.checked);
    let allSelectedData;
    if (e.target.checked) {
      allSelectedData = users.map((user) => user.username);
      console.log('handleselectall data: ', allSelectedData);
    } else {
      allSelectedData = [];
    }

    setSelectedUsers(allSelectedData);
    onSelect(allSelectedData);
  };

  const handleSelectOne = (e, username) => {
    console.log('handleSelectOne');

    const selectedIndex = selectedUsers.indexOf(username);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, username);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }
    setSelectedUsers(newSelectedUsers);

    onSelect(newSelectedUsers);
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
    // console.log('handleChangePage');
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
    setPage(0);
    // console.log('handleChangeRowsPerPage');
  };

  return (
    <>
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Checkbox
                    checked={selectedUsers.length === users.length}
                    color="primary"
                    indeterminate={
                      selectedUsers.length > 0 &&
                      selectedUsers.length < users.length
                    }
                    onChange={handleSelectAll}
                  />
                  UserName
                </TableCell>
                <TableCell align="left">name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Registration date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .filter((user) => {
                  return user;
                })
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((user) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user._id}
                    selected={selectedUsers.indexOf(user.username) !== -1}>
                    <TableCell className={classes.tableCell}>
                      <div className={classes.tableCellInner}>
                        <Checkbox
                          checked={selectedUsers.indexOf(user.username) !== -1}
                          color="primary"
                          onChange={(event) =>
                            handleSelectOne(event, user.username)
                          }
                          value="true"
                        />
                        <Avatar
                          className={classes.avatar}
                          src={user.avatarUrl}
                        />
                        <Typography
                          className={classes.nameText}
                          variant="body1">
                          {user.username}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {user.firstname} {user.lastname}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {user.email}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {moment(user.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            backIconButtonProps={{
              'aria-label': 'Previous Page'
            }}
            component="div"
            nextIconButtonProps={{
              'aria-label': 'Next Page'
            }}
            count={users.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </PortletContent>
      </Portlet>
    </>
  );
};

UsersTable.defaultProps = {
  users: [],
  onSelect: () => {},
  onShowDetails: () => {}
};

UsersTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onShowDetails: PropTypes.func,
  users: PropTypes.array.isRequired
};

export default withStyles(styles)(UsersTable);
