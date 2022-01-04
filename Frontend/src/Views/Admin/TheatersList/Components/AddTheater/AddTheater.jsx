import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField, Typography } from '@material-ui/core';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from '../../../../../Components/Index';
import * as TheaterApi from '../../../../../Api/TheaterApi/TheaterApi';
import styles from './Styles';
import { Add } from '@material-ui/icons';

const AddTheater = (props) => {
  const { classes, className, editTheater, theater, ...rest } = props;
  const rootClassName = classNames(classes.root, className);
  const [image, setImage] = useState('');
  const [theaterName, setTheaterName] = useState('');
  const [ticketPrice, setTicketPrice] = useState('');
  const [city, setCity] = useState('');
  const [seats, setSeats] = useState([]);
  const [seatsAvailable, setSeatsAvailable] = useState('');
  const [status, setStatus] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const [seatLength, setSeatLength] = useState(0);

  const prevTheater = editTheater;
  console.log('prevTheater', prevTheater);

  const mainTitle = prevTheater ? 'Edit Theater Info' : 'Add Theater Info';
  const submitButton = prevTheater
    ? 'Update Theater Info'
    : 'Save Theater Info';

  const submitAction = prevTheater
    ? () => handleUpdateTheater()
    : () => handleCreateTheater();

  useEffect(() => {
    if (prevTheater) {
      setImage(prevTheater.image);
      setTheaterName(prevTheater.theaterName);
      setSeats(prevTheater.seats);
      setCity(prevTheater.city);
      setSeatsAvailable(prevTheater.seatsAvailable);
      setTicketPrice(prevTheater.ticketPrice);
    }
  }, []);

  const handleCreateTheater = async () => {
    console.log('handleCreateTheater');
    if (
      theaterName === '' ||
      ticketPrice === '' ||
      image === '' ||
      city === '' ||
      seats === [] ||
      seatsAvailable === ''
    ) {
      setStatus('fail');
      setInfoMessage('Check The Empty Fields');
    } else {
      // seats = seats.filter((el) => {
      //   if (el.length !== 0) {
      //     return el;
      //   }
      // });
      try {
        const res = await TheaterApi.createTheater(
          image,
          theaterName,
          ticketPrice,
          city,
          seats,
          seatsAvailable
        );
        setStatus('success');
        setInfoMessage('Theater Info have been saved.');
      } catch (error) {
        setStatus('fail');
        setInfoMessage('Theater Info have not been saved, try again.');
      }
    }
  };
  const handleUpdateTheater = async () => {
    const id = prevTheater._id;
    console.log('handleUpdateTheater');
    if (
      theaterName === '' ||
      ticketPrice === '' ||
      image === '' ||
      city === '' ||
      seats === [] ||
      seatsAvailable === ''
    ) {
      setStatus('fail');
      setInfoMessage('Check The Empty Fields');
    } else {
      try {
        const res = await TheaterApi.updateTheaterInfo(
          id,
          theaterName,
          ticketPrice,
          city,
          seats,
          seatsAvailable,
          image
        );
        console.log(res);
        setStatus('success');
        setInfoMessage('Theater Info have been saved.');
      } catch (error) {
        setStatus('fail');
        setInfoMessage('Theater Info have not been saved, try again.');
      }
    }
  };
  const handleDeleteTheater = async () => {
    const id = prevTheater._id;
    try {
      const res = await TheaterApi.deleteTheaterInfo(id);
      setStatus('success');
      setInfoMessage('Delete Success');
      return res;
    } catch (error) {
      setStatus('fail');
      return error;
    }
  };

  //극장 좌석 라인 추가
  const addSeatLow = () => {
    console.log('addSeatLow');
    // const newSeats = [...prevTheater.seats, []];
    // setSeats(newSeats);
    if (prevTheater) {
      setSeats([...prevTheater.seats, []]);
    } else {
      setSeats([...seats, []]);
      // console.log(seats);
    }
    console.log(seats);
  };

  //라인별 좌석 개수 추가
  const handleSeatsChange = (index, value) => {
    console.log('handleSeatsChange', index, value);
    // if (value > 20) return;
    const newSeats = [...seats];

    newSeats[index] = Array.from({ length: value }, () => 0);

    const testSeats = newSeats.filter((x) => x.length > 0);

    setSeats(testSeats);
  };

  //전체 좌석 라인, 개수 랜더링
  const renderSeats = () => {
    const newSeats = [...seats];
    return (
      <>
        <div className={classes.field}>
          <Button onClick={addSeatLow}>
            <Add />
            add Seats
          </Button>
        </div>
        {newSeats.length > 0 &&
          newSeats.map((seat, index) => (
            <div className={classes.field}>
              <TextField
                key={`new-seat-${index}`}
                className={classes.textField}
                label={
                  'Add number of seats for row : ' +
                  (index + 10).toString(36).toUpperCase()
                }
                margin="dense"
                required
                value={seat.length}
                variant="outlined"
                type="number"
                inputProps={{
                  min: 0,
                  max: 80
                }}
                onChange={(e) => handleSeatsChange(index, e.target.value)}
              />
            </div>
          ))}
      </>
    );
  };

  return (
    <>
      <Portlet {...rest} className={rootClassName}>
        <PortletHeader>
          <PortletLabel title={mainTitle} />
        </PortletHeader>
        <PortletContent noPadding>
          <form autoComplete="off" noValidate>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                helperText="Please specify the cinema name"
                label="Name"
                margin="dense"
                required
                value={theaterName}
                variant="outlined"
                onChange={(e) => setTheaterName(e.target.value)}
              />

              <TextField
                fullWidth
                className={classes.textField}
                label="City"
                margin="dense"
                required
                variant="outlined"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Image Url"
                margin="dense"
                required
                value={image}
                variant="outlined"
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Ticket Price"
                margin="dense"
                type="number"
                value={ticketPrice}
                variant="outlined"
                onChange={(e) => setTicketPrice(e.target.value)}
              />
              <TextField
                className={classes.textField}
                label="Seats Available"
                margin="dense"
                required
                value={seatsAvailable}
                variant="outlined"
                onChange={(e) => setSeatsAvailable(e.target.value)}
              />
            </div>
            {renderSeats()}
            {/* <div className={classes.field}>
              <Button onClick={addSeatLow}>
                <Add />
                add Seats
              </Button>
            </div>
            {seats.length > 0 &&
              seats.map((seat, index) => (
                <div className={classes.field}>
                  <TextField
                    key={`new-seat-${index}`}
                    className={classes.textField}
                    label={
                      'Add number of seats for row : ' +
                      (index + 10).toString(36).toUpperCase()
                    }
                    margin="dense"
                    required
                    value={seatLength}
                    variant="outlined"
                    type="number"
                    inputProps={{
                      min: 0,
                      max: 20
                    }}
                    onChange={(e) => handleSeatsChange(index, e.target.value)}
                  />
                </div>
              ))} */}
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button
            className={classes.buttonFooter}
            color="primary"
            variant="contained"
            onClick={submitAction}>
            {submitButton}
          </Button>
          {prevTheater && (
            <Button
              className={classes.buttonFooter}
              color="dafault"
              variant="contained"
              onClick={handleDeleteTheater}>
              Delete Cinema
            </Button>
          )}

          {status ? (
            status === 'success' ? (
              <Typography
                className={classes.infoMessage}
                color="primary"
                variant="caption">
                {infoMessage}
                Theater Info have been saved!
              </Typography>
            ) : (
              <Typography
                className={classes.infoMessage}
                color="error"
                variant="caption">
                {infoMessage}
              </Typography>
            )
          ) : null}
        </PortletFooter>
      </Portlet>
    </>
  );
};

AddTheater.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
  // Theater: PropTypes.object.isRequired
};

export default withStyles(styles)(AddTheater);