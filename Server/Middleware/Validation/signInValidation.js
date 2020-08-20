const Validator = require('validator');
const isEmpty = require('is-empty');

const validateSignInData = (data) => {
  let errors = {};

  // is-empty를 위한 emptyfield 생성
  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  //이름체크
  if (Validator.isEmpty(data.username)) {
    errors.username = 'username Field is empty';
  } else if (Validator.checkNameLength(data.username, { min: 2, max: 20 })) {
    error.username = 'username must be at least 2 characters';
  }

  //이메일체크
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email Field is empty';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  //비밀번호 체크
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is empty';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is empty';
  }
  if (!Validator.checkPasswordLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateSignInData;
