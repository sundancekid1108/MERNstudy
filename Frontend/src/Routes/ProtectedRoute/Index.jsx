import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = (props) => {
  const { component: Component, ...rest } = props;
  const token = localStorage.getItem('token');

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
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
