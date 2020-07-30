const express = require('express');
const router = express.Router();

const globalRouter = require('./Routes/Global/GlobalRouter');
const postRouter = require('./Routes/Post/PostRouter');
const userRouter = require('./Routes/User/UserRouter');

router.use('/', globalRouter);

//Post관련 API
router.use('/posts', postRouter);

//User관련 API
router.use('/users', userRouter);

module.exports = router;
