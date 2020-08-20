import User from '../../Database/Model/User/User';
import validateSignInData from '../../Middleware/Validation/signInValidation';
import validateLoginData from '../../Middleware/Validation/loginValidation';
import validator from 'validator';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

//user 조회
exports.getUserList = async (req, res) => {
  try {
    const users = await User.find({}, null, { sort: { _id: -1 } });
    res.json(users).status(200);
  } catch (e) {
    console.log(e);
    res.json({ response: 'getUserList Error' });
  }
};

//userInfo 조회
exports.getUserInfo = async (req, res) => {
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
    res.send({ response: 'getUserInfo Error' }).status(500);
  }
};

//회원가입
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Email 형식 체크

    if (!validator.isEmail(email)) {
      res.json({ response: 'Email is incorrect format' });
      //   console.log(res);
    }

    const duplicateEmail = await User.findOne({ email });

    if (duplicateEmail) {
      res.json({ response: 'This Email is already  existed' });
    }

    const duplicateUserName = await User.findOne({ username });

    if (duplicateUserName) {
      res.json({ response: 'UserName is already existed' });
    }
    const user = new User({
      username,
      email,
      password,
    });

    // user 저장
    await user
      .save()
      .then((result) => {
        res.json(result).status(201);
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (err) {
    res.json('err', err).status(500);
  }
};

//user 수정
exports.editUserInfo = async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.body);
    const userId = req.params.id;
    const { username, password } = req.body;
    console.log(req.params);
    if (!ObjectId.isValid(userId)) {
      res.json('400 bad request').status = 400; // Bad Request
    }
    const user = await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        username: username,
        password: password,
      },
      { multi: true, new: true },
    );

    if (!user) {
      res.send({ response: '404 Error' }).status(404);
    }
    res.json(user).status(200);
  } catch (err) {
    res.json(err).status(500);
  }
  res.send({ response: 'editUserInfo' });
};

//user 삭제
exports.deleteUserInfo = async (req, res) => {
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
      res.send({ response: '404 Error' }).status(404);
    }

    res.send({ response: 'delete UserInfo successfully' }).status(200);
  } catch (err) {
    res.json(err);
  }
};
