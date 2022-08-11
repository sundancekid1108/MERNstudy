import React, { useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
//Redux test
import { useDispatch, useSelector } from 'react-redux';

// const ProtectedRoute = (props) => {
//   const { component: Component, ...rest } = props;

//   const token = localStorage.getItem('token');
//   //const token = sessionStorage.getItem('token');
//   const auth = useSelector((state) => state.auth);
//   const isAuthenticated = auth.isAuthenticated;

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Navigate
//             to={{ pathname: '/signin', state: { from: props.location } }}
//           />
//         )
//       }
//     />
//   );
// };

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  return auth ? children : <Navigate to='/signin' />
}


ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool
};
ProtectedRoute.defaultProps = {
  isAuthenticated: false
};


export default ProtectedRoute;
