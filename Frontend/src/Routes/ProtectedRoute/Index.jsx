import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
//Redux test
import { useDispatch, useSelector } from 'react-redux';

const ProtectedRoute = (props) => {
  const { component: Component, ...rest } = props;
  const token = localStorage.getItem('token');
  const state = useSelector((state) => state.auth);
  const isAuthenticated = state.isAuthenticated;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/signin', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool
};
ProtectedRoute.defaultProps = {
  isAuthenticated: false
};

export default ProtectedRoute;
