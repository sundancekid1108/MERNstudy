import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import {
  DisplayMode,
  SearchInput,
  ResponsiveDialog
} from '../../../../Components/Index';
import AddMovie from '../AddMovie/Index';
import styles from './Styles';

const MovieToolBar = (props) => {
  console.log('MovieToolBar props', props);
  const { classes, className } = props;
  const rootClassName = classNames(classes.root, className);
  const [isOpenAddDialog, setIsOpenAddDialog] = useState(false);

  //popup dialog 열고 닫기
  const handleAddDialog = () => {
    if (isOpenAddDialog === false) {
      setIsOpenAddDialog(true);
    } else {
      setIsOpenAddDialog(false);
    }
  };

  return (
    <>
      <div className={rootClassName}>
        <div className={classes.row}>
          <span className={classes.spacer} />
          <Button
            color="primary"
            size="small"
            variant="outlined"
            onClick={handleAddDialog}>
            add
          </Button>
        </div>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search Movie"
          />
          <span className={classes.spacer} />
          <DisplayMode mode="grid" />
        </div>
        <ResponsiveDialog
          id="Add_Movie"
          open={isOpenAddDialog}
          handleClose={handleAddDialog}>
          <AddMovie />
        </ResponsiveDialog>
      </div>
    </>
  );
};

MovieToolBar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  movie: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieToolBar);
