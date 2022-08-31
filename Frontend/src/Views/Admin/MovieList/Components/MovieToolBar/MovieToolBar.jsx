import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { SearchInput, ResponsiveDialog } from '../../../../../Components/Index';
import AddMovie from '../AddMovie/AddMovie';
import styles from './Styles';

const MovieToolBar = (props) => {
  // console.log('MovieToolBar props', props);
  const { classes, className, tmdbMovieList } = props;
  const rootClassName = classNames(classes.root, className);
  const [isOpenAddDialog, setIsOpenAddDialog] = useState(false);

  //popup dialog 열고 닫기
  const handleCreateDialog = () => {
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
          <SearchInput
            className={classes.searchInput}
            placeholder="Search movie"
          />
          <Button
            onClick={handleCreateDialog}
            color="primary"
            size="small"
            variant="outlined">
            Add
          </Button>
        </div>
      </div>
      <ResponsiveDialog
        id="Add_Movie"
        open={isOpenAddDialog}
        handleClose={handleCreateDialog}>
        <AddMovie tmdbMovieList={tmdbMovieList} />
      </ResponsiveDialog>
    </>
  );
};

MovieToolBar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieToolBar);
