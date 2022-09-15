import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Drawer } from '@material-ui/core';
import Footer from './Components/Footer/Footer'
import Navbar from './Components/Navbar/Navbar'

import styles from './Styles';
import { RestoreTwoTone } from '@material-ui/icons';

const UserLayout = (props) => {
    const { title, children, classes } = props;

    const [isOpen, setIsOpen] = useState(true);

    const handleToggleOpen = () => {
        if (isOpen == false) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    };

    // console.log('children', children);

    return (
        <div className={classes.root}>
            <Navbar />
            {children}
            {/* <Footer /> */}
        </div>
    );
};

export default withStyles(styles)(UserLayout);
