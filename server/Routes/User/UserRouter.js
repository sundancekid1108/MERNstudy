import express from 'express';
import * as UserApi from '../../Controller/User/UserController';
import * as AuthJwt from '../../Middleware/authJwt';
const userRouter = express.Router();

userRouter.get('/userinfo/:id', UserApi.getUserInfo);

userRouter.get('/userlist', UserApi.getUserList);

userRouter.post('/signup', UserApi.createUser);

userRouter.post('/auth/login', UserApi.postUserLogin);
userRouter.get('/auth/login', AuthJwt.verifyToken);

userRouter.patch('/edituserinfo/:id', UserApi.editUserInfo);

userRouter.delete('/deleteuser/:id', UserApi.deleteUserInfo);

export default userRouter;