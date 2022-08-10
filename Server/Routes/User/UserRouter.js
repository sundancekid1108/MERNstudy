import express from 'express';
import * as UserApi from '../../Controller/User/UserController';
import * as AuthJwt from '../../Middleware/authJwt';
import upload from '../../Middleware/Multer/Multer';
const userRouter = express.Router();

userRouter.get('/userinfo', AuthJwt.verifyToken, UserApi.getCurrentUserInfo);

userRouter.get('/userlist', AuthJwt.verifyToken, UserApi.getUserList);

userRouter.post('/signup', UserApi.createUser);

userRouter.post('/auth/facebooklogin', UserApi.facebookAuthLogin);

userRouter.post('/auth/googlelogin', UserApi.googleAuthLogin);

userRouter.post('/auth/login', UserApi.postUserLogin);

userRouter.get('/auth/login', AuthJwt.verifyToken);

userRouter.post('/updateuserinfo', AuthJwt.verifyToken, upload.single('file'), UserApi.updateUserInfo);

userRouter.post('/updateprofileimg', AuthJwt.verifyToken, upload.single('file'), UserApi.updateProfileImg)

userRouter.delete('/deleteuser', AuthJwt.verifyToken, UserApi.deleteUserInfo);

userRouter.delete('/deleteprofileimg', AuthJwt.verifyToken, UserApi.deleteProfileImg);

userRouter.delete('/deleteuserbyid/:id', AuthJwt.verifyToken, UserApi.deleteUserById);

export default userRouter;