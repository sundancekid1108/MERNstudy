const Validator = require('validator');
const isEmpty = require('is-empty');

//네임 검증
export const validateUserName = (username) => {
    let userNameErrors = {};
    const userNameData = !isEmpty(username) ? username : '';
    if (Validator.isEmpty(userNameData)) {
        userNameErrors.username = 'username field is required';
    } else if (!Validator.isLength(userNameData, { min: 3, max: 20 })) {
        userNameErrors.username = 'username field must be at least 3 characters and under 20characters';
    }
    return {
        userNameErrors,
        userNameIsValid: isEmpty(userNameErrors),
    };
};

//firstname 체크
export const validateUserFirstName = (firstname) => {
    let userFirstNameErrors = {};
    const userFirstNameData = !isEmpty(firstname) ? firstname : '';
    if (Validator.isEmpty(userFirstNameData)) {
        userFirstNameErrors.firstname = 'firstname field is required';
    } else if (!Validator.isLength(userFirstNameData, { min: 3, max: 20 })) {
        userFirstNameErrors.firstname =
            'firstname field must be at least 3 characters and under 20characters';
    }
    return {
        userFirstNameErrors,
        userFirstNameIsValid: isEmpty(userFirstNameErrors),
    };
};

//firstname 체크
export const validateUserLastName = (lastname) => {
    let userLastNameErrors = {};
    const userLastNameData = !isEmpty(lastname) ? lastname : '';
    if (Validator.isEmpty(userLastNameData)) {
        userLastNameErrors.firstname = 'lastname field is required';
    } else if (!Validator.isLength(userLastNameData, { min: 3, max: 20 })) {
        userLastNameErrors.lastname =
            'lastname field must be at least 3 characters and under 20characters';
    }
    return {
        userLastNameErrors,
        userLastNameIsValid: isEmpty(userLastNameErrors),
    };
};

// 이메일 검증
export const validateEmail = (email) => {
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
//비밀번호 검증
export const validatePasswordType = (password) => {
    let passwordTypeErrors = {};
    const passwordData = !isEmpty(password) ? password : '';
    if (Validator.isEmpty(passwordData)) {
        passwordTypeErrors.password = 'Password Field is empty';
    } else if (!Validator.isLength(passwordData, { min: 6, max: 30 })) {
        passwordTypeErrors.password = 'Password must be at least 6 characters';
    }
    return {
        passwordTypeErrors,
        passwordTypeIsValid: isEmpty(passwordTypeErrors),
    };
};

//회원가입 비밀번호  검증
export const validatePassword = (password1, password2) => {
    const password1Data = !isEmpty(password1) ? password1 : '';
    const password2Data = !isEmpty(password2) ? password2 : '';

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