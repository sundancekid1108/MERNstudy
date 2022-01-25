import User from '../../Database/Model/User/User';
import * as validateSignInData from '../../Middleware/Validation/signinValidation';
import * as validateLogInData from '../../Middleware/Validation/loginValidation';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as AuthJwt from '../../Middleware/authJwt';
dotenv.config();

const { ObjectId } = mongoose.Types;

// Admin 유저 리스트 조회
export const getUserList = async(req, res) => {
    try {
        const isAdmin = req.decodedUser.isAdmin;
        if (isAdmin == true) {
            const users = await User.find({}, null, {
                sort: {
                    _id: -1,
                },
            });
            console.log('users', users);
            res.json(users).status(200);
        } else {
            res.json({
                response: 'Not Admin Account',
            });
        }
    } catch (err) {
        console.log(err);
        res.json({
            response: 'getUserList Error',
        });
    }
};

//현재 유저 정보 조회
export const getCurrentUserInfo = async(req, res) => {
    try {
        const userId = req.decodedUser.userId;

        const currentuser = await User.findById(userId);

        // console.log('currentuser : ', currentuser);
        return res
            .json({
                profilePic: currentuser.profilePic,
                phoneNumber: currentuser.phonenumber,
                userId: currentuser.id,
                userEmail: currentuser.email,
                userName: currentuser.username,
                userFirstName: currentuser.firstname,
                userLastName: currentuser.lastname,
                isAdmin: currentuser.isAdmin,
                role: currentuser.role,
            })
            .status(200);
        // return res.json(currentuser).status(200);
    } catch (err) {
        console.log(err);
        return res.json(err);
    }
};
//회원가입

export const createUser = async(req, res) => {
    // console.log(req.body);
    const { username, email, firstname, lastname, password1, password2 } = req.body;

    //username 검증
    const { userNameErrors, userNameIsValid } = await validateSignInData.validateUserName(username);
    if (!userNameIsValid) {
        return res.status(400).json({ response: userNameErrors.username });
    }

    //firstname 검증
    const { userFirstNameErrors, userFirstNameIsValid } =
    await validateSignInData.validateUserFirstName(firstname);
    if (!userFirstNameIsValid) {
        return res.status(400).json({ response: userFirstNameErrors.firstname });
    }

    //lastname 검증
    const { userLastNameErrors, userLastNameIsValid } = await validateSignInData.validateUserLastName(
        lastname
    );
    if (!userLastNameIsValid) {
        return res.status(400).json({ response: userLastNameErrors.lastname });
    }

    //Email 검증
    const { emailErrors, emailIsValid } = await validateSignInData.validateEmail(email);
    if (!emailIsValid) {
        return res.status(400).json({ response: emailErrors.email });
    }

    //password 검증
    const { passwordErrors, passwordIsValid } = await validateSignInData.validatePassword(
        password1,
        password2
    );
    if (!passwordIsValid) {
        return res.status(400).json({ response: passwordErrors.password });
    }

    // DB에서 중복된 email 체크
    const duplicateEmail = await User.findOne({
        email,
    });

    if (duplicateEmail) {
        return res.status(400).json({
            response: 'This Email is already  existed',
        });
    }

    //DB에서 중복된 username 체크
    const duplicateUserName = await User.findOne({
        username,
    });

    if (duplicateUserName) {
        // console.log(duplicateUserName);
        return res.status(400).json({
            response: 'UserName is already existed',
        });
    }
    //중복 Email, username 체크 후 password hash하여 저장

    const newUser = new User({
        username: username,
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: password1,
    });

    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) {
                res.json(error);
            }
            newUser.password = hash;
            // console.log(newUser);

            newUser
                .save()
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((error) => {
                    res.status(400).json(error);
                });
        });
    });
};

//user 수정
export const updateUserInfo = async(req, res) => {
    try {
        console.log('updateuserinfo');
        console.log('req.decodedUser : ', req.decodedUser);
        console.log('req.body : ', req.body);
        const { username, email, firstname, lastname, password, phonenumber } = req.body;
        const userId = req.decodedUser.userId;

        const updateUser = await User.findByIdAndUpdate({
            _id: userId,
        }, {
            username: username,
            firstname: firstname,
            lastname: lastname,
        }, { multi: true, new: true });

        res.json(updateUser).status(200);
    } catch (err) {
        res.json(err).status(500);
    }
};
//회원탈퇴
export const deleteUserInfo = async(req, res) => {
    try {
        console.log('req.decodedUser : ', req.decodedUser);

        const userId = req.decodedUser.userId;
        if (!ObjectId.isValid(userId)) {
            return (res.json(res).status = 400);
        }

        const userInfo = await User.findByIdAndDelete({
            _id: req.params.id,
        });

        if (!userInfo) {
            return res
                .send({
                    response: '404 Error',
                })
                .status(404);
        }

        return res
            .send({
                response: 'delete UserInfo successfully',
            })
            .status(200);
    } catch (err) {
        res.json(err);
    }
};

//Admin 회원 삭제
export const deleteUserById = async(req, res) => {
    // console.log(req);
    try {
        const isAdminCheck = req.decodedUser.isAdmin;
        if (isAdminCheck) {
            const userId = req.params.id;
            const userInfo = await User.findByIdAndDelete({
                _id: userId,
            });

            if (!userInfo) {
                return res
                    .json({
                        response: 'No User',
                    })
                    .status(404);
            }

            return res
                .json({
                    response: 'delete UserInfo successfully',
                })
                .status(200);
        } else {
            res.json({ response: 'You Cant delete User Profiles' });
        }
    } catch (err) {
        res.json(err);
    }
};

//user 로그인
export const postUserLogin = async(req, res) => {
    const { email, password } = req.body;

    //Email 체크
    const { emailErrors, emailIsValid } = await validateLogInData.validateLoginEmail(email);

    if (!emailIsValid) {
        return res.status(400).json(emailErrors);
    }

    // Password체크
    const { passwordErrors, passwordIsValid } = await validateLogInData.validateLoginPassword(
        password
    );

    if (!passwordIsValid) {
        return res.status(400).json(passwordErrors);
    }

    //DB에서 Email 매치되는 user 없을때 에러 처리
    const isEmailMatchedUser = await User.findOne({
        email,
    });

    if (!isEmailMatchedUser) {
        return res.status(404).json({
            response: 'Check your Email and Password',
        });
    }

    //비밀번호  match 확인
    const isEmailMatchedAndPasswordMatchedUser = await bcrypt.compareSync(
        password,
        isEmailMatchedUser.password
    );

    if (isEmailMatchedAndPasswordMatchedUser) {
        // 비밀번호 맞을때 로그인 성공! 나머지 작업 처리
        // jwt payload 생성
        const LoginSuccessUser = await await User.findOne({
            email,
        });
        console.log(LoginSuccessUser);
        const payload = {
            userId: LoginSuccessUser.id,
            user: LoginSuccessUser,
            isAdmin: LoginSuccessUser.isAdmin,
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY, {
                expiresIn: 360000,
            },
            (err, token) => {
                if (err) {
                    return res.json(err);
                    accessToken: null;
                }
                return res.status(200).json({
                    profilePic: LoginSuccessUser.profilePic,
                    phoneNumber: LoginSuccessUser.phonenumber,
                    userId: LoginSuccessUser.id,
                    userEmail: LoginSuccessUser.email,
                    userName: LoginSuccessUser.username,
                    userFirstName: LoginSuccessUser.firstname,
                    userLastName: LoginSuccessUser.lastname,
                    isAdmin: LoginSuccessUser.isAdmin,
                    role: LoginSuccessUser.role,
                    accessToken: token,
                });
            }
        );
    } else {
        //비밀번호 틀릴때
        return res.status(400).json({
            response: 'Login failed Check your Email and Password',
            accessToken: null,
        });
    }
};

//Facebook 로그인
export const facebookAuthLogin = async(req, res) => {
    // console.log(req.body);
    const { email, userID, name } = req.body;
    const nameList = name.split(' ');
    try {
        const existedUser = await User.findOne({
            facebookLoginProviderId: userID,
        });
        // console.log('existedUser', existedUser);
        if (existedUser) {
            const payload = {
                userId: existedUser.id,
                user: existedUser,
                isAdmin: existedUser.isAdmin,
            };
            jwt.sign(
                payload,
                process.env.JWT_SECRET_KEY, {
                    expiresIn: 360000,
                },
                (err, token) => {
                    if (err) {
                        return res.json(err);
                        accessToken: null;
                    }
                    return res.status(200).json({
                        profilePic: existedUser.profilePic,
                        phoneNumber: existedUser.phonenumber,
                        userId: existedUser.id,
                        userEmail: existedUser.email,
                        userName: existedUser.username,
                        userFirstName: existedUser.firstname,
                        userLastName: existedUser.lastname,
                        isAdmin: existedUser.isAdmin,
                        role: existedUser.role,
                        accessToken: token,
                    });
                }
            );
        } else {
            const facebookAuthUser = new User({
                firstname: nameList[0],
                lastname: nameList[1],
                username: name,
                email: email,
                isAdmin: false,
                facebookLoginProviderId: userID,
            });

            await facebookAuthUser.save();

            const payload = {
                userId: facebookAuthUser.id,
                user: facebookAuthUser,
                isAdmin: facebookAuthUser.isAdmin,
            };
            jwt.sign(
                payload,
                process.env.JWT_SECRET_KEY, {
                    expiresIn: 360000,
                },
                (err, token) => {
                    if (err) {
                        return res.json(err);
                        accessToken: null;
                    }
                    return res.status(200).json({
                        profilePic: facebookAuthUser.profilePic,
                        phoneNumber: facebookAuthUser.phonenumber,

                        userId: facebookAuthUser.id,
                        userEmail: facebookAuthUser.email,
                        userName: facebookAuthUser.username,
                        userFirstName: facebookAuthUser.firstname,
                        userLastName: facebookAuthUser.lastname,
                        isAdmin: facebookAuthUser.isAdmin,
                        role: facebookAuthUser.role,
                        accessToken: token,
                    });
                }
            );
        }
    } catch (error) {
        return res.status(400).json({
            response: 'facebookAuthLogin Fail',
        });
    }
};
//Google 로그인
export const googleAuthLogin = async(req, res) => {
    // console.log('googleAuthLogin', req.body.profileObj);

    // console.log(req.body.accessToken);
    const { googleId, email, name, givenName, familyName } = req.body.profileObj;
    // const accessToken = req.body.accessToken;
    // console.log(googleId, email, name, givenName, familyName, accessToken);

    try {
        const existedUser = await User.findOne({
            googleLoginProviderId: googleId,
        });
        // console.log('existedUser', existedUser);
        if (existedUser) {
            const payload = {
                userId: existedUser.id,
                user: existedUser,
                isAdmin: existedUser.isAdmin,
            };
            jwt.sign(
                payload,
                process.env.JWT_SECRET_KEY, {
                    expiresIn: 360000,
                },
                (err, token) => {
                    if (err) {
                        return res.json(err);
                        accessToken: null;
                    }
                    return res.status(200).json({
                        profilePic: existedUser.profilePic,
                        phoneNumber: existedUser.phonenumber,
                        userId: existedUser.id,
                        userEmail: existedUser.email,
                        userName: existedUser.username,
                        userFirstName: existedUser.firstname,
                        userLastName: existedUser.lastname,
                        isAdmin: existedUser.isAdmin,
                        role: existedUser.role,
                        accessToken: token,
                    });
                }
            );
        } else {
            const googleAuthUser = new User({
                firstname: givenName,
                lastname: familyName,
                username: name,
                email: email,
                isAdmin: false,
                googleLoginProviderId: googleId,
            });

            await googleAuthUser.save();

            // console.log(googleAuthUser);

            const payload = {
                userId: googleAuthUser.id,
                user: googleAuthUser,
                isAdmin: googleAuthUser.isAdmin,
            };
            jwt.sign(
                payload,
                process.env.JWT_SECRET_KEY, {
                    expiresIn: 360000,
                },
                (err, token) => {
                    if (err) {
                        return res.json(err);
                        accessToken: null;
                    }
                    return res.status(200).json({
                        profilePic: googleAuthUser.profilePic,
                        phoneNumber: googleAuthUser.phonenumber,
                        userId: googleAuthUser.id,
                        userEmail: googleAuthUser.email,
                        userName: googleAuthUser.username,
                        userFirstName: googleAuthUser.firstname,
                        userLastName: googleAuthUser.lastname,
                        isAdmin: googleAuthUser.isAdmin,
                        role: googleAuthUser.role,
                        accessToken: token,
                    });
                }
            );
        }
    } catch (error) {
        return res.status(400).json({
            response: 'googleAuthLogin Fail',
        });
    }
};