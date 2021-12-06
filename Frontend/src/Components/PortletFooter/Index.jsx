import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import styles from './Styles';

const PortletFooter = (props) => {
  const { classes, className, noDivider, children, ...rest } = props;
  const rootClassName = classNames(
    {
      [classes.root]: true,
      [classes.noDivider]: noDivider
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

PortletFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  noDivider: PropTypes.bool
};

export default withStyles(styles)(PortletFooter);
