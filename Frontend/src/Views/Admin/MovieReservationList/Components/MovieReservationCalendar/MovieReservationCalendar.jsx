import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { withStyles } from '@material-ui/core';
// import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';

import styles from './Styles';
const MovieReservationCalendar = (props) => {
  const { classes, moviereservations } = props;
  return (
    <>
      <FullCalendar
        initialView="dayGridMonth"
        plugins={[dayGridPlugin]}

      />
    </>
  );
};

export default withStyles(styles)(MovieReservationCalendar);
