const Validator = require('validator');
const isEmpty = require('is-empty');

exports.validateUserName = (username) => {
  let userNameErrors = {};
  const userNameData = !isEmpty(username) ? username : '';
  if (Validator.isEmpty(userNameData)) {
    userNameErrors.username = 'username is required';
  } else if (!Validator.isLength(userNameData, { min: 2, max: 20 })) {
    userNameErrors.username = 'username must be at least 2 characters';
  }
  return {
    userNameErrors,
    userNameIsValid: isEmpty(userNameErrors),
  };
};

exports.validateEmail = (email) => {
  const emailData = !isEmpty(email) ? email : '';
  let emailErrors = {};

  if (Validator.isEmpty(emailData)) {
    emailErrors.email = 'Email Field is empty';
  } else if (!Validator.isEmail(emailData)) {
    emailErrors.email = 'Email is invalid';
  }

  return {
    emailErrors,
    emailIsValid: isEmpty(emailErrors),
  };
};

exports.validatePassword = (password1, password2) => {
  password1Data = !isEmpty(password1) ? password1 : '';
  password2Data = !isEmpty(password2) ? password2 : '';

  let passwordErrors = {};

  if (Validator.isEmpty(password1Data) || Validator.isEmpty(password2)) {
    passwordErrors.password = 'Password field is empty';
  } else if (!Validator.isLength(password1Data, { min: 6, max: 30 })) {
    passwordErrors.password = 'Password must be at least 6 characters';
  } else if (!Validator.isLength(password2Data, { min: 6, max: 30 })) {
    passwordErrors.password = 'Password must be at least 6 characters';
  } else if (!Validator.equals(password1Data, password2Data)) {
    passwordErrors.password = 'Passwords must match';
  }

  return {
    passwordErrors,
    passwordIsValid: isEmpty(passwordErrors),
  };
};
