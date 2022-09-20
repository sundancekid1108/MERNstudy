import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const WithLayoutRoute = (props) => {
  const { layout: Layout, component: Component, children, layoutProps, ...rest } = props;

  // console.log("WithLayoutRoute props", props)

  return (<Layout {...layoutProps} >{children}</Layout>)

};

WithLayoutRoute.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

export default WithLayoutRoute;
