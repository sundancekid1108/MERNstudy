import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CustomizedSnackbar from '../../Components/CustomizedSnackbar/Index';
//Redux test
import { useDispatch, useSelector } from 'react-redux';

const Alert = (props) => {
  // const { alerts } = props;
  const state = useSelector((state) => state.alert);
  const alerts = state.alerts;
  return (
    <>
      {alerts.length > 0 &&
        alerts.map((alert) => (
          <CustomizedSnackbar
            isOpen={true}
            vertical="top"
            horizontal="right"
            variant={alert.alertType}
            message={alert.msg}
          />
        ))}
    </>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

Alert.defaultProps = {
  alerts: []
};

export default Alert;
