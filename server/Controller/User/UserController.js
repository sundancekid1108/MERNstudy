import User from '../../Database/Model/User/User';
import * as validateSignInData from '../../Middleware/Validation/signInValidation';
import * as validateLogInData from '../../Middleware/Validation/loginValidation';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
dotenv.config();
const {
    ObjectId
} = mongoose.Types;

//user 조회
exports.getUserList = async(req, res) => {
    try {
        const users = await User.find({}, null, {
            sort: {
                _id: -1
            }
        });
        res.json(users).status(200);
    } catch (err) {
        console.log(err);
        res.json({
            response: 'getUserList Error'
        });
    }
};

//userInfo 조회
exports.getUserInfo = async(req, res) => {
    try {
        console.log(req.params.id);
        const userId = req.params.id;
        if (!ObjectId.isValid(userId)) {
            res.json('400 bad request').status = 400;
        }

        const user = await User.findById(userId);
        res.json(user).status(200);
    } catch (err) {
        console.log(err);
        res.send({
            response: 'getUserInfo Error'
        }).status(500);
    }
};

//회원가입
exports.createUser = async(req, res) => {
    // console.log(req.body);
    const {
        username,
        email,
        password1,
        password2
    } = req.body;

    //username 검증
    const {
        userNameErrors,
        userNameIsValid,
    } = validateSignInData.validateUserName(username);
    if (!userNameIsValid) {
        return res.status(400).json(userNameErrors);
    }

    //Email
    const {
        emailErrors,
        emailIsValid
    } = validateSignInData.validateEmail(email);
    if (!emailIsValid) {
        return res.status(400).json(emailErrors);
    }

    //password 검증
    const {
        passwordErrors,
        passwordIsValid,
    } = validateSignInData.validatePassword(password1, password2);
    if (!passwordIsValid) {
        return res.status(400).json(passwordErrors);
    }

    // DB에서 중복된 email 체크
    const duplicateEmail = await User.findOne({
        email
    });

    //DB에서 중복된 username 체크
    const duplicateUserName = await User.findOne({
        username
    });

    if (duplicateEmail) {
        console.log(duplicateEmail);
        res.json({
            response: 'This Email is already  existed'
        });
    } else if (duplicateUserName) {
        console.log(duplicateUserName);
        res.json({
            response: 'UserName is already existed'
        });
    } else {
        //중복 Email, username 체크 후 password hash하여 저장
        const newUser = new User({
            username: username,
            email: email,
            password: password1,
        });

        const saltRounds = 10;

        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) {
                    res.json(err);
                }
                newUser.password = hash;
                // console.log(newUser);

                newUser
                    .save()
                    .then((result) => {
                        res.status(201).json(result);
                    })
                    .catch((err) => {
                        res.json(err);
                    });
            });
        });
    }
};

//user 수정
exports.editUserInfo = async(req, res) => {
    try {
        console.log(req.params);
        console.log(req.body);
        const userId = req.params.id;
        const {
            username,
            password
        } = req.body;
        console.log(req.params);
        if (!ObjectId.isValid(userId)) {
            res.json('400 bad request').status = 400; // Bad Request
        }
        const user = await User.findByIdAndUpdate({
            _id: userId,
        }, {
            username: username,
            password: password,
        }, {
            multi: true,
            new: true
        }, );

        if (!user) {
            res.send({
                response: '404 Error'
            }).status(404);
        }
        res.json(user).status(200);
    } catch (err) {
        res.json(err).status(500);
    }
    res.send({
        response: 'editUserInfo'
    });
};

//user 삭제
exports.deleteUserInfo = async(req, res) => {
    try {
        console.log(req.params.id);
        const userId = req.params.id;
        console.log(userId);
        if (!ObjectId.isValid(userId)) {
            res.json(res).status = 400;
        }

        const userInfo = await User.findByIdAndDelete({
            _id: req.params.id,
        });

        if (!userInfo) {
            res.send({
                response: '404 Error'
            }).status(404);
        }

        res.send({
            response: 'delete UserInfo successfully'
        }).status(200);
    } catch (err) {
        res.json(err);
    }
};

//user 로그인
exports.postUserLogin = async(req, res) => {
    const {
        email,
        password
    } = req.body;

    //Email 체크
    const {
        emailErrors,
        emailIsValid,
    } = await validateLogInData.validateLoginEmail(email);

    if (!emailIsValid) {
        res.status(400).json(emailErrors);
    }

    // Password체크
    const {
        passwordErrors,
        passwordIsValid,
    } = await validateLogInData.validateLoginPassword(password);

    if (!passwordIsValid) {
        res.status(400).json(passwordErrors);
    }

    //DB에서 Email 매치되는 user 없을때 에러 처리
    const isEmailMatchedUser = await User.findOne({
        email
    });

    if (!isEmailMatchedUser) {
        res.status(404).json({
            response: 'There is No User'
        });
    }

    //비밀번호  match 확인
    const isEmailMatchedAndPasswordMatchedUser = await bcrypt.compareSync(
        password,
        isEmailMatchedUser.password,
    );

    if (isEmailMatchedAndPasswordMatchedUser) {
        // 비밀번호 맞을때 로그인 성공! 나머지 작업 처리 
        // jwt payload 생성
        const payload = {
            id: isEmailMatchedAndPasswordMatchedUser.id,
            username: isEmailMatchedAndPasswordMatchedUser.username
        }
        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY, {
                expiresIn: 3600
            },
            (err, token) => {
                res.status(200).json({
                    response: 'Login Success!!!',
                    token: "Bearer " + token
                });
            }

        )

    } else {
        //비밀번호 틀릴때
        res.status(400).json({
            response: 'Login failed Password incorrect!!'
        });
    }
};