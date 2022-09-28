import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { SearchInput, ResponsiveDialog } from '../../../../../Components/Index';
import * as TmdbApi from '../../../../../Api/TmdbApi/TmdbApi'
import styles from './Styles';

const TmdbMovieToolBar = (props) => {
  const { classes, className, onChange, handleTmdbMovieSearch, keyword } = props;
  const rootClassName = classNames(classes.root, className);
  const [isOpenAddDialog, setIsOpenAddDialog] = useState(false);


  //popup dialog 열고 닫기
  const handleDialog = () => {
    if (isOpenAddDialog === false) {
      setIsOpenAddDialog(true);
    } else {
      setIsOpenAddDialog(false);
    }
  };

  const onKeyPress = (event) => {
    if (e.key === "Enter") {
      console.log(e.target.value);
    }
  }

  return (<>
    <div className={rootClassName}>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search movie on TMDB"
          onChange={onChange}
          value={keyword}
          onKeyPress={handleTmdbMovieSearch}
          onClick={handleTmdbMovieSearch}

        />
        <Button
          onClick={handleDialog}
          color="primary"
          size="small"
          variant="outlined">
          Add
        </Button>
        <ResponsiveDialog
          id="Add-theater"
          open={isOpenAddDialog}
          handleClose={handleDialog}>

        </ResponsiveDialog>
      </div>
    </div>
  </>)
}
export default withStyles(styles)(TmdbMovieToolBar);