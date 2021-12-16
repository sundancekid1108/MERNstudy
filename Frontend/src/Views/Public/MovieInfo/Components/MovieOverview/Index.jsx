import React from 'react';
import {
  Grid,
  Typography,
  ButtonBase,
  Box,
  makeStyles,
  withStyles
} from '@material-ui/core';
import styles from './Styles';

const MovieOverview = (props) => {
  const { classes, title, description, image } = props;
  console.log('MovieOverview Props', props);

  const Stats = ({ stats, classes }) => {
    stats.map((stat, index) => (
      <Box key={`${stat.label}-${index}`} display="flex" alignItems="center">
        <Typography
          className={classes.label}
          color="inherit"
          gutterBottom
          variant="subtitle1">
          {stat.label}
        </Typography>
        <Typography color="inherit" variant="body2" gutterBottom>
          {stat.value}
        </Typography>
      </Box>
    ));
  };

  return (
    <>
      <Grid container spacing={5}>
        <Grid item>
          <ButtonBase className={classes.image}>
            <img className={classes.image} alt="movie" src={image} />
          </ButtonBase>
        </Grid>
        <Grid item xs={8} container direction="column" spacing={2}>
          <Grid item>
            <Typography color="inherit" gutterBottom variant="h2">
              {title}
            </Typography>
            <Typography color="inherit" variant="body1" gutterBottom>
              {description}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              ID: test ??
            </Typography>
            <Box height={20} />
          </Grid>
          <Grid item xs>
            <Stats
              classes={classes}
              stats={[
                { label: 'Released', value: 'test' },
                { label: 'Runtime', value: 'test' },
                { label: 'Director', value: 'test' },
                { label: 'Genre', value: 'test' },
                { label: 'Status', value: 'test' },
                { label: 'Language', value: 'test' }
              ]}
            />
          </Grid>
          {/* <Grid item>
          <Typography
            color="inherit"
            variant="body2"
            style={{ cursor: 'pointer' }}>
            Remove
          </Typography>
        </Grid> */}
        </Grid>
      </Grid>
    </>
  );
};

export default withStyles(styles)(MovieOverview);
