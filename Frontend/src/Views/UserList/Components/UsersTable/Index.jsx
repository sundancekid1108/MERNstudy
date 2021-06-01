import React, { useState } from "react";
import moment from "moment";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import {
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
} from "@material-ui/core";
import Portlet from "../../../../Components/Portlet/Index";
import PortletContent from "../../../../Components/PortletContent/Index";
import styles from "./Styles";

const UsersTable = (props) => {
  const { classes, className } = props;
  const rootClassName = classNames(classes.root, className);

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
                    // onChange={this.handleSelectAll}
                  />
                  Name
                </TableCell>
                <TableCell align="left">Username</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Registration date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .filter((user) => {
                  return user;
                })
                .slice(0, rowsPerPage)
                .map((user) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user.username}
                    selected={selectedUsers.indexOf(user.username) !== -1}
                  >
                    <TableCell className={classes.tableCell}>
                      <div className={classes.tableCellInner}>
                        <Checkbox
                          checked={selectedUsers.indexOf(user.username) !== -1}
                          color="primary"
                          onChange={(event) =>
                            this.handleSelectOne(event, user.username)
                          }
                          value="true"
                        />
                        <Avatar
                          className={classes.avatar}
                          src={user.avatarUrl}
                        />
                        <Typography
                          className={classes.nameText}
                          variant="body1"
                        >
                          {user.firstname}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {user.username}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {user.email}
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      {moment(user.createdAt).format("DD/MM/YYYY")}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            // backIconButtonProps={{
            //   "aria-label": "Previous Page",
            // }}
            component="div"
            count={users.length}
            // nextIconButtonProps={{
            //   "aria-label": "Next Page",
            // }}
            // onChangePage={this.handleChangePage}
            // onChangeRowsPerPage={this.handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </PortletContent>
      </Portlet>
    </>
  );
};

export default withStyles(styles)(UsersTable);
