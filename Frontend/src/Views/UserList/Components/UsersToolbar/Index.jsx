import React, { useState } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core";
import { Button, IconButton } from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import SearchInput from "../../../../Components/SearchInput/Index";
import styles from "./Styles";

const UsersToolbar = (props) => {
  const { classes, className, selectedUsers } = props;
  //   const [selectedUsers, setSelectedUsers] = useState([]);
  const rootClassName = classNames(classes.root, className);
  return (
    <>
      <div className={rootClassName}>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search user"
          />

          <div>
            {selectedUsers.length > 0 && (
              <IconButton
                className={classes.deleteButton}
                // onClick={this.onDeleteUser}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withStyles(styles)(UsersToolbar);
