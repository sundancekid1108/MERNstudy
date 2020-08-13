import express from 'express';
import * as UserApi from '../../Controller/User/UserController';
const userRouter = express.Router();

userRouter.get('/userinfo/:id', UserApi.getUserInfo);

userRouter.get('/userlist', UserApi.getUserList);

userRouter.post('/signup', UserApi.createUser);

// userRouter.get('/edituserinfo', UserApi.editUserInfo);

userRouter.delete('/deleteuser/:id', UserApi.deleteUserInfo);

export default userRouter;
