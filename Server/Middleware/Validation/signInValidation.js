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

// const validateSignInData = (data) => {
//   let errors = {};

//   // is-empty를 위한 emptyfield 생성
//   data.username = !isEmpty(data.username) ? data.username : '';
//   data.email = !isEmpty(data.email) ? data.email : '';
//   data.password = !isEmpty(data.password) ? data.password : '';
//   data.password2 = !isEmpty(data.password2) ? data.password2 : '';

//   //이름체크
//   if (Validator.isEmpty(data.username)) {
//     errors.username = 'username Field is empty';
//   } else if (Validator.checkNameLength(data.username, { min: 2, max: 20 })) {
//     error.username = 'username must be at least 2 characters';
//   }

//   //이메일체크
//   if (Validator.isEmpty(data.email)) {
//     errors.email = 'Email Field is empty';
//   } else if (!Validator.isEmail(data.email)) {
//     errors.email = 'Email is invalid';
//   }

//   //비밀번호 체크
//   if (Validator.isEmpty(data.password)) {
//     errors.password = 'Password field is empty';
//   }

//   if (Validator.isEmpty(data.password2)) {
//     errors.password2 = 'Confirm password field is empty';
//   }
//   if (!Validator.checkPasswordLength(data.password, { min: 6, max: 30 })) {
//     errors.password = 'Password must be at least 6 characters';
//   }
//   if (!Validator.equals(data.password, data.password2)) {
//     errors.password2 = 'Passwords must match';
//   }

//   return {
//     errors,
//     isValid: isEmpty(errors),
//   };
// };

// export default validateSignInData;
