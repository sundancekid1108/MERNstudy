import User from '../../Database/Model/User/User';
import validator from 'validator';

//user 조회
exports.getUserInfo = (req, res) => {
  res.send({ response: 'getUserInfo' });
};

exports.getUserList = (req, res) => {
  res.json({ response: 'getUserList' });
};

//회원가입
exports.createUser = async (req, res) => {
  try {
    const { name, userName, email, password } = req.body;
    // Email 형식 체크
    if (!validator.isEmail(email)) {
      res.json({ response: 'Email is incorrect format' });
      //   console.log(res);
    }

    const duplicateEmailUser = await User.findOne({ email });
    if (duplicateEmailUser) {
      res.json({ response: 'User exists' });
    }

    //   const user = new User({
    //     name,
    //     userName,
    //     email,
    //     password,
    //   });
  } catch (e) {
    res.send({ response: 'createPost Error' }).status(500);
  }
};

//user 수정
exports.editUserInfo = (req, res) => {
  res.send({ response: 'editUserInfo' });
};

//user 삭제
exports.deleteUserInfo = (req, res) => {
  res.send({ response: 'deleteUserInfo' });
};
