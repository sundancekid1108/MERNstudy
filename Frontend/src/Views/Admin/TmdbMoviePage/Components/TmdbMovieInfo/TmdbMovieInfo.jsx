import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, Grid, Button, TextField, Typography, MenuItem, Divider } from '@material-ui/core';
import { AccessTime as AccessTimeIcon } from '@material-ui/icons';
import * as  TmdbApi from '../../../../../Api/TmdbApi/TmdbApi'
import { Paper } from '../../../../../Components/Index';
import styles from './Styles';

const TmdbMovieInfo = (props) => {
    const { classes, className, movie, tmdbMovieCast, tmdbMovieInfo } = props;
    // console.log(props)
    const rootClassName = classNames(classes.root, className);
    const tmdb_movie_info = tmdbMovieInfo
    const tmdb_movie_cast = tmdbMovieCast
    const movieInfo = Object.assign({}, tmdb_movie_info, tmdb_movie_cast)
    const [infoMessage, setInfoMessage] = useState('');

    const handleCreateTmdbMovieInfo = async () => {
        // console.log("click!")
        const body = movieInfo
        try {
            const result = await TmdbApi.createTmdbMovie(body)
            console.log(result)
            if (result.status == 200) {
                setInfoMessage("Add TMDB Movie Success")
            } else {
                setInfoMessage("Failed check status")
            }
        } catch (error) {
            return errror
            setInfoMessage("Failed check status")
        }
    }

    useEffect(() => {
        // getTmdbMovieInfoById(tmdb_movie_id)

        // getTmdbMovieCreditsInfoById(tmdb_movie_id)
        return () => { }
    }, [])


    if (tmdb_movie_info && tmdb_movie_cast) {
        return (
            <>
                <div className={rootClassName}>
                    <Typography variant="h4" className={classes.title}>
                        TMDB MOVIE INFO
                    </Typography>
                    <div className={classes.imageWrapper}>
                        <img alt="movie" className={classes.image} src={"https://image.tmdb.org/t/p/original/" + tmdbMovieInfo.poster_path} />
                    </div>
                    <div className={classes.field}>
                        {movieInfo.original_title}
                    </div>
                    <div className={classes.field}>
                        {movieInfo.overview}
                    </div>
                    <div className={classes.field}>
                        {movieInfo.id}
                    </div>
                    <div className={classes.field}>
                        {movieInfo.genres.map((genre, id) => (
                            <div className={classes.field}>
                                {genre.name}
                            </div>
                        ))}
                    </div>


                    <div className={classes.field}>
                        {movieInfo.crew.filter(({ job }) => job === "Director")[0].name}
                    </div>



                    <Button
                        className={classes.buttonFooter}
                        color="default"
                        variant="contained"
                        onClick={handleCreateTmdbMovieInfo}
                    >
                        Add Movie Info
                    </Button>

                    <Typography
                        className={classes.infoMessage}
                        color="primary"
                        variant="caption">
                        {infoMessage}
                    </Typography>






                </div>

            </>
        );
    } else {
        return (
            <>
                <div className={rootClassName}>
                    <Typography variant="h4" className={classes.title}>
                        TMDB MOVIE INFO Error
                    </Typography>

                </div>

            </>
        );
    }


};

TmdbMovieInfo.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    // movie: PropTypes.object.isRequired
};

export default withStyles(styles)(TmdbMovieInfo);
