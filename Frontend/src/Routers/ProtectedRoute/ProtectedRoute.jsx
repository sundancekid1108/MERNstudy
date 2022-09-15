import React, { useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

const ProtectedRoute = (props) => {
    // const { children } = props
    const {
        layout: Layout,
        component: Component,

        children,
        ...rest
    } = props
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    // console.log("ProtectedRoute childre", children)
    // return isAuthenticated ? children : <Navigate to='/' />

    return isAuthenticated ? (user.isAdmin ? (<Layout>{children}</Layout>) : children) : < Navigate to='/signin' />
    // return isAuthenticated ? children : < Navigate to='/signin' />
}


ProtectedRoute.propTypes = {
    isAuthenticated: PropTypes.bool
};
ProtectedRoute.defaultProps = {
    isAuthenticated: false
};


export default ProtectedRoute;