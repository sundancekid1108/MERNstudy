import React, { useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    // return isAuthenticated ? children : <Navigate to='/' />
    return isAuthenticated ? children : < Navigate to = '/signin' / >
}


ProtectedRoute.propTypes = {
    isAuthenticated: PropTypes.bool
};
ProtectedRoute.defaultProps = {
    isAuthenticated: false
};


export default ProtectedRoute;