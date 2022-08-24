import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import styles from './Styles';

const SearchInput = (props) => {
  const { classes, className, onChange, onClick, style, value, ...rest } = props;
  const rootClassName = classNames(classes.root, className);


  return (
    <div className={rootClassName} style={style}>
      <SearchIcon className={classes.icon} onClick={onClick} />
      <Input
        {...rest}
        className={classes.input}
        disableUnderline
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  style: PropTypes.object
};

SearchInput.defaultProps = {
  onChange: () => { }
};

export default withStyles(styles)(SearchInput);
