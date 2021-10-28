import express from 'express';
import * as UserApi from '../../Controller/User/UserController';
import * as AuthJwt from '../../Middleware/authJwt';
const userRouter = express.Router();

userRouter.get('/userinfo', AuthJwt.verifyToken, UserApi.getCurrentUserInfo);

userRouter.get('/userlist', AuthJwt.verifyToken, UserApi.getUserList);

userRouter.post('/signup', UserApi.createUser);

userRouter.post('/auth/login', UserApi.postUserLogin);

userRouter.get('/auth/login', AuthJwt.verifyToken);

userRouter.patch(
    '/updateuserinfo',
    AuthJwt.verifyToken,
    UserApi.updateUserInfo,
);

userRouter.delete('/deleteuser', AuthJwt.verifyToken, UserApi.deleteUserInfo);

userRouter.delete(
    '/deleteuserbyid/:id',
    AuthJwt.verifyToken,
    UserApi.deleteUserById,
);

export default userRouter;