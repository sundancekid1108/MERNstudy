import React, { useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthAction from '../../Store/Actions/AuthAction';
import * as MovieAction from '../../Store/Actions/MovieAction';

const ProtectedRoute = (props) => {

    const {
        layout: Layout,
        component: Component,
        children,
        layoutProps,
        ...rest
    } = props
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AuthAction.getLoginUserInfo());

    }, []);

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const test = useSelector((state) => state.auth);

    console.log("ProtectedRoute.isAuthenticated ", isAuthenticated)
    console.log("ProtectedRoute.user ", user)

    if (isAuthenticated) {
        if (user.isAdmin) {
            return (<Layout>{children}</Layout>)
        } else {
            return (<Layout>{children}</Layout>)
        }
    } else {
        console.log("something is wrong")
        return < Navigate to='/signin' />
    }




}


ProtectedRoute.propTypes = {
    isAuthenticated: PropTypes.bool
};
ProtectedRoute.defaultProps = {
    isAuthenticated: false
};


export default ProtectedRoute;