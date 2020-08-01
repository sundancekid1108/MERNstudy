import User from '../../Database/Model/User/User';

exports.getUserInfo = (req, res) => {
  res.send({ response: 'getUser' });
};

exports.createUser = (req, res) => {
  res.send({ response: 'createUser' });
};
exports.editUserInfo = (req, res) => {
  res.send({ response: 'editUserInfo' });
};
