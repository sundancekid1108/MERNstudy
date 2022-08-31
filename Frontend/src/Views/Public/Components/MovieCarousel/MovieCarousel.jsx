import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { makeStyles, withStyles, Typography, Button } from '@material-ui/core';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MovieCard from '../MovieCard/MovieCard';
import MovieCardTest from '../MovieCardTest/MovieCardTest';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import styles from './Styles';

const useStyles = makeStyles(styles);

const NextArrow = (props) => {
  const { currentSlide, slideCount, onClick } = props;
  const classes = useStyles({ currentSlide, slideCount });
  return (
    <div className={classnames(classes.arrow, 'nextArrow')} onClick={onClick}>
      <ArrowForwardIos color="inherit" />
    </div>
  );
};

const PrevArrow = (props) => {
  const { currentSlide, onClick } = props;
  const classes = useStyles({ currentSlide });
  return (
    <div className={classnames(classes.arrow, 'prevArrow')} onClick={onClick}>
      <ArrowBackIos color="inherit" />
    </div>
  );
};

const MovieCarousel = (props) => {
  const { classes, carouselClass, title, movies, to = '/' } = props;
  console.log('MovieCarousel movie', movies);

  const MAX_SLIDE = 3;
  const settings = {
    centerMode: true,
    slidesToShow: MAX_SLIDE,
    infinite: movies.length >= MAX_SLIDE,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    lazyLoad: true,
    swipeToSlide: true,

    nextArrow: <NextArrow classes={classes} />,
    prevArrow: <PrevArrow classes={classes} />,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };
  if (!movies) {
    return (
      <>
        <div className={carouselClass}>
          <div className={classes.container}>
            <Typography className={classes.h2} variant="h2" color="inherit">
              No Movies Info
            </Typography>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className={carouselClass}>
        <div className={classes.container}>
          <Typography className={classes.h2} variant="h2" color="inherit">
            {title}
          </Typography>
          <Link to={to} style={{ textDecoration: 'none' }} movies={movies}>
            <Button className={classes.button} color="primary">
              Explore All
            </Button>
          </Link>
        </div>
        <Slider {...settings} className={classes.slider}>
          {movies.map((movie) => (
            <MovieCardTest key={movie._id} movie={movie} />
          ))}
        </Slider>
      </div>
    );
  }
};

export default withStyles(styles)(MovieCarousel);
