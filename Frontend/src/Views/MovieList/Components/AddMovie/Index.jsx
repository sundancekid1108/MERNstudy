import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, Grid } from '@material-ui/core';
import { Button, TextField, Typography } from '@material-ui/core';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from '../../../../components';

const AddMovie = (props) => {
  const addMovieData = () => {
    console.alert('addMovieTestt!!');
  };

  return (
    <>
      <Portlet>
        <PortletHeader>
          <PortletLabel subtitle="Add a new one" title="Movie" />
        </PortletHeader>
      </Portlet>
    </>
  );
};

export default AddMovie;
