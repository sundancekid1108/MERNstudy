const Validator = require('validator');
const isEmpty = require('is-empty');

export const validateLoginEmail = (email) => {
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

export const validateLoginPassword = (password) => {
    const passwordData = !isEmpty(password) ? password : '';

    let passwordErrors = {};

    if (Validator.isEmpty(passwordData)) {
        passwordErrors.password = 'Password field is empty';
    }

    return {
        passwordErrors,
        passwordIsValid: isEmpty(passwordErrors),
    };
};