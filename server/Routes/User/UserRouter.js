import express from 'express';
import * as UserApi from '../../Controller/User/UserController';
const userRouter = express.Router();

userRouter.get('/user', UserApi.getUserInfo);

export default userRouter;
