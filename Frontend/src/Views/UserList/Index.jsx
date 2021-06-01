import React, { useState } from "react";
import { withStyles, CircularProgress, Typography } from "@material-ui/core";
import Dashboard from "../../Layouts/Dashboard/Dashboard";
import { UsersTable, UsersToolbar } from "./Components/Index";
import styles from "./Styles";

const UserList = (props) => {
  const { classes } = props;
  const [signal, setSignal] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSelectUser = () => {};
  const handleDeleteUsers = () => {};

  return (
    <>
      <Dashboard title="Users">
        <div className={classes.root}>
          <UsersToolbar selectedUsers={selectedUsers} />
          <div className={classes.content}>renderUser</div>
        </div>
      </Dashboard>
    </>
  );
};

export default withStyles(styles)(UserList);
