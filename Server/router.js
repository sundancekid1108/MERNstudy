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

// module.exports = router;
export default router;
