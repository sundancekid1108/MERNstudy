import express from './node_modules/express';
import postRouter from './Routes/Post/PostRouter';
import globalRouter from './Routes/Global/GlobalRouter';
import userRouter from './Routes/User/UserRouter';
import movieRouter from './Routes/Movie/MovieRouter';
import movieReservationRouter from './Routes/MovieReservation/MovieReservationRouter';
import theaterRouter from './Routes/Theater/TheaterRouter';
import movieTimeRouter from './Routes/MovieTime/MovieTimeRouter';

const router = express.Router();

//전체 Router
router.use('/', globalRouter);

//Post관련 API
router.use('/posts', postRouter);

//User관련 API
router.use('/users', userRouter);

//Movie관련 API
router.use('/movies', movieRouter);

router.use('/movietimes', movieTimeRouter);

router.use('/moviereservation', movieReservationRouter);

router.use('/theater', theaterRouter);

//예외 처리

router.use((err, req, res, next) => {
    if (err.status === 404) {
        console.log(err);
        res.status(404).send({ response: '404' });
    }

    if (err.status === 500) {
        console.log(err);
        res.status(500).send({ response: '500' });
    }
});

export default router;