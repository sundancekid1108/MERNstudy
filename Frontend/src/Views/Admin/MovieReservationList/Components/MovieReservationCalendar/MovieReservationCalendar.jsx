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
        events={[
          { title: 'Movie Title 1', date: '2022-01-22' },
          { title: 'Movie Title 1', date: '2022-01-22' },
          { title: 'Movie Title 1', date: '2022-01-22' },
          { title: 'Movie Title 1', date: '2022-01-22' }
        ]}
      />
    </>
  );
};

export default withStyles(styles)(MovieReservationCalendar);
