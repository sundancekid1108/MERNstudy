import express from './node_modules/express';
import postRouter from './Routes/Post/PostRouter';
import globalRouter from './Routes/Global/GlobalRouter';
import userRouter from './Routes/User/UserRouter';
const router = express.Router();

//전체 Router
router.use('/', globalRouter);

//Post관련 API
router.use('/posts', postRouter);

//User관련 API
router.use('/users', userRouter);

//예외 처리
// router.use((req, res, next) => {
//   next({
//     status: 404,
//     message: 'Not Found',
//   });
// });

router.use((err, req, res, next) => {
    if (err.status === 404) {
        console.log(err);
        return res.status(404).send({ response: '404' });
    }

    if (err.status === 500) {
        console.log(err);
        return res.status(500).send({ response: '500' });
    }
});

// module.exports = router;
export default router;