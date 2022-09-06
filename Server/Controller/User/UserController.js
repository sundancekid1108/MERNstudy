import User from '../../Database/Model/User/User';
import * as validateSignInData from '../../Middleware/Validation/signInValidation';
import * as validateLogInData from '../../Middleware/Validation/loginValidation';
// const path = require('path')
// const fs = require('fs')
import fs from 'fs'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import upload from '../../Middleware/Multer/Multer';

import * as AuthJwt from '../../Middleware/authJwt';
dotenv.config();

const { ObjectId } = mongoose.Types;

// Admin 유저 리스트 조회
export const getUserList = async(req, res) => {
    console.log('getUserList', req);
    try {
        const isAdmin = req.decodedUser.isAdmin;
        if (isAdmin == true) {
            const users = await User.find({}, null, {
                sort: {
                    _id: -1,
                },
            });
            // console.log('users', users);
            res.json(users).status(200);
        } else {
            res.json({
                response: 'Not Admin Account',
            });
        }
    } catch (error) {
        // console.log(err);
        res.json({
            response: 'getUserList Error',
        });
    }
};

//현재 유저 정보 조회
export const getCurrentUserInfo = async(req, res) => {
    console.log(req.decodedUser)
    try {
        const userId = req.decodedUser._id;

        const currentuser = await User.findById(userId);

        // console.log('currentuser : ', currentuser);
        return res
            .json({
                profileImg: currentuser.profileImg,
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

    } catch (error) {
        console.log(error);
        return res.status(400).json(err);
    }
};
//회원가입

export const createUser = async(req, res) => {
    console.log(req.body);
    // const { username, email, firstname, lastname, password1, password2 } = req.body;
    const username = req.body.userName;
    const email = req.body.userEmail;
    const firstname = req.body.userFirstName;
    const lastname = req.body.userLastName;
    const password1 = req.body.userPassword;
    const password2 = req.body.userPassword2;
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
        password: password1
    });

    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) {
                res.json(error);
            }
            newUser.password = hash;
            console.log("newUser", newUser);

            newUser
                .save()
                .then((result) => {
                    return res.status(200).json(result);
                })
                .catch((error) => {
                    console.log("createUser error", error)
                    return res.status(400).json(error);

                });
        });
    });
};


//updateProfileImg
export const updateProfileImg = async(req, res) => {
    console.log("updateProfileImg req", req)
    console.log("req.file", req.file)
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    } else {
        console.log('updateProfileImg success')
        res.send(file)
    }




}



//user 수정
export const updateUserInfo = async(req, res) => {
    // console.log("req header", req.header)
    // console.log("req body", req.body)

    const userId = req.decodedUser._id;
    // console.log("userId", userId)
    const body = req.body


    try {
        // if (req.file) {
        //     const file = req.file
        //         // console.log('updateProfileImg success')
        //         // console.log(file)
        //     const url = req.protocol + '://' + req.get('host') + '/' + file.path
        //     console.log("url", url)
        //     const user = await User.findByIdAndUpdate({ _id: userId }, {
        //         profileImg: url,
        //     }, { upsert: true })

        //     return res.status(200).json({ response: "Update User Info" })

        //     res.send(file)
        // } else {
        //     return res.status(400).json({ response: "No Image File" });
        // }


        if (body.password1 && body.password2) {
            const password1 = body.password1
            const password2 = body.password2
            console.log(password1, '&', password2)
            const { passwordErrors, passwordIsValid } = await validateSignInData.validatePassword(
                password1,
                password2
            );
            if (!passwordIsValid) {
                return res.status(400).json({ response: passwordErrors.password });
            } else {
                const saltRounds = 10;
                // const user = await User.findOne({_id: userId})

                const salt = await bcrypt.genSalt(saltRounds)
                const cryptPassword = await bcrypt.hash(password1, salt)
                console.log("cryptPassword", cryptPassword)

                const user = await User.findByIdAndUpdate({ _id: userId }, {
                    password: cryptPassword
                }, { upsert: true })

                return res.status(200).json({ response: "Update User Password Success" })

            }
        }

        if (body.username) {
            const username = body.username

            const { userNameErrors, userNameIsValid } = await validateSignInData.validateUserName(username);
            if (!userNameIsValid) {
                return res.status(400).json({ response: userNameErrors.username });
            }

            const duplicateUserName = await User.findOne({
                username,
            });
            if (duplicateUserName) {
                return res.status(400).json({
                    response: 'UserName is already existed',
                });
            } else {
                const user = await User.findByIdAndUpdate({ _id: userId }, {
                    username: username,
                }, { upsert: true })

                return res.status(200).json({ response: "Update User Info Success" })
            }
        }

        if (body.email) {
            const email = body.email

            const duplicateEmail = await User.findOne({
                email,
            });

            if (duplicateEmail) {
                return res.status(400).json({
                    response: 'This Email is already  existed',
                });
            } else {

                const { emailErrors, emailIsValid } = await validateSignInData.validateEmail(email);
                if (!emailIsValid) {
                    return res.status(400).json({ response: emailErrors.email });
                }

                const user = await User.findByIdAndUpdate({ _id: userId }, {
                    email: email,
                }, { upsert: true })

                return res.status(200).json({ response: "Update User Info Success" })
            }

        }

        if (body.firstname) {
            const firstname = body.firstname
            const { userFirstNameErrors, userFirstNameIsValid } =
            await validateSignInData.validateUserFirstName(firstname);
            if (!userFirstNameIsValid) {
                return res.status(400).json({ response: userFirstNameErrors.firstname });
            } else {
                const user = await User.findByIdAndUpdate({ _id: userId }, {
                    firstname: firstname,
                }, { upsert: true })

                return res.status(200).json({ response: "Update User Info Success" })
            }
        }

        if (body.lastname) {
            const lastname = body.lastname

            const { userLastNameErrors, userLastNameIsValid } = await validateSignInData.validateUserLastName(
                lastname
            );
            if (!userLastNameIsValid) {
                return res.status(400).json({ response: userLastNameErrors.lastname });
            } else {
                const user = await User.findByIdAndUpdate({ _id: userId }, {
                    lastname: lastname,
                }, { upsert: true })

                return res.status(200).json({ response: "Update User Info Success" })
            }
        }

        if (body.phonenumber) {
            //핸드폰번호 validation 필요..
            const phonenumber = body.phonenumber
            const user = await User.findByIdAndUpdate({ _id: userId }, {
                phonenumber: phonenumber,
            }, { upsert: true })

            return res.status(200).json({ response: "Update User Info Success" })
        }






    } catch (error) {
        return res.status(400).json(error);
    }


};

//이미지 삭제
export const deleteProfileImg = async(req, res) => {
    // console.log('req.decodedUser : ', req.decodedUser);
    const userId = req.decodedUser._id
        // console.log("deleteProfileImg")
    try {

        const currentuser = await User.findById(userId);
        console.log('currentuser : ', currentuser);
        if (currentuser.profileImg !== '') {
            const data = currentuser.profileImg.split('/')
            const imgName = data[5]
            if (fs.existsSync('./Upload/Data/' + imgName)) {

                // 파일이 존재한다면 true 그렇지 않은 경우 false 반환
                fs.unlinkSync('./Upload/Data/' + imgName);
                const user = await User.findByIdAndUpdate({ _id: userId }, {
                    profileImg: '',
                }, { upsert: true })
                return res.status(200).json({ response: "delete profile pic" })
            } else {
                return res.status(200).json({ response: "delete profile pic" })
            }

        } else {
            console.log("delete img success")
            return res.status(200).json({ response: "delete profile pic" })
        }

    } catch (error) {
        return res.status(400).json(error)
    }
}

//회원탈퇴
export const deleteUserInfo = async(req, res) => {
    try {
        console.log('req.decodedUser : ', req.decodedUser);

        const userId = req.decodedUser._id;
        if (!ObjectId.isValid(userId)) {
            return (res.json(res).status = 400);
        }

        const userInfo = await User.findByIdAndDelete({
            _id: req.params.id,
        });

        if (!userInfo) {
            return res
                .json({
                    response: '404 Error',
                })
                .status(404);
        }

        return res
            .json({
                response: 'delete UserInfo successfully',
            })
            .status(200);
    } catch (error) {
        res.json(error);
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
            return res.json({ response: 'You Cant delete User Profiles' });
        }
    } catch (error) {
        return res.json(error);
    }
};

//user 로그인
export const postUserLogin = async(req, res) => {
    const email = req.body.userEmail;
    const password = req.body.userPassword;
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
        console.log("LoginSuccessUser", LoginSuccessUser);
        const payload = {
            // userId: LoginSuccessUser.id,
            user: LoginSuccessUser,
            // isAdmin: LoginSuccessUser.isAdmin,
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
                    profileImg: LoginSuccessUser.profileImg,
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
                        profileImg: existedUser.profileImg,
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
                        profileImg: facebookAuthUser.profileImg,
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
                        profileImg: existedUser.profileImg,
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
                        profileImg: googleAuthUser.profileImg,
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