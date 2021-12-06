import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import styles from './Styles';

const PortletHeader = (props) => {
  const { classes, className, noDivider, noPadding, children, ...rest } = props;
  const rootClassName = classNames(
    {
      [classes.root]: true,
      [classes.noDivider]: noDivider,
      [classes.noPadding]: noPadding
    },
    className
  );

  return (
    <>
      <div {...rest} className={rootClassName}>
        {children}
      </div>
    </>
  );
};

PortletHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  noDivider: PropTypes.bool,
  noPadding: PropTypes.bool
};

export default withStyles(styles)(PortletHeader);
