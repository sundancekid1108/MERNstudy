import express from 'express';
import * as UserApi from '../../Controller/User/UserController';
const userRouter = express.Router();

userRouter.get('/userinfo', UserApi.getUserInfo);

userRouter.post('/signup', UserApi.createUser);

userRouter.get('/edituserinfo', UserApi.getUserInfo);

export default userRouter;
