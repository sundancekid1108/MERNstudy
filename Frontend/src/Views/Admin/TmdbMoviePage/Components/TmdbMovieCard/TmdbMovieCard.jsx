import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Typography, Divider } from '@material-ui/core';
import { AccessTime as AccessTimeIcon } from '@material-ui/icons';
import { Paper } from '../../../../../Components/Index';
import styles from './Styles';

const TmdbMovieCard = (props) => {
    const { classes, className, movie, ...rest } = props;
    const rootClassName = classNames(classes.root, className);

    return (
        <>
            <Paper className={rootClassName}>
                <div className={classes.imageWrapper}>
                    <img alt="movie" className={classes.image} src={"https://image.tmdb.org/t/p/original/" + movie.poster_path} />
                </div>
                <div className={classes.details}>
                    <Typography className={classes.title} variant="h4">
                        {movie.title}
                    </Typography>



                </div>

            </Paper>
        </>
    );
};

TmdbMovieCard.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    movie: PropTypes.object.isRequired
};

export default withStyles(styles)(TmdbMovieCard);
