import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { SearchInput, ResponsiveDialog } from '../../../../../Components/Index';

// Component styles
import styles from './Styles';
import AddTheater from '../AddTheater/AddTheater';

const TheatersToolbar = (props) => {
  const { classes, className } = props;
  const rootClassName = classNames(classes.root, className);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const handleDialog = () => {
    if (isOpenDialog == false) {
      setIsOpenDialog(true);
    } else {
      setIsOpenDialog(false);
    }
  };
  return (
    <>
      <div className={rootClassName}>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search cinema"
          />
          <Button
            onClick={handleDialog}
            color="primary"
            size="small"
            variant="outlined">
            Add
          </Button>
        </div>
      </div>
      <ResponsiveDialog
        id="Add-theater"
        open={isOpenDialog}
        handleClose={handleDialog}>
        <AddTheater />
      </ResponsiveDialog>
    </>
  );
};

TheatersToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TheatersToolbar);
