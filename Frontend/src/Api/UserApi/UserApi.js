import api from "../axiosApi";

export const userSignUp = (username, email, password1, password2) => {
    api
        .post("/users/signup", {
            username,
            email,
            password1,
            password2,
        })
        .then((response) => {
            const responseUserSigninData = response.data;
            return responseUserSigninData;
            console.log(responseUserSigninData);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const userLogin = (email, password) => {
    // console.log(email);
    // console.log(password);
    return api
        .post("/users/auth/login", {
            email: email,
            password: password,
        })
        .then((response) => {
            // console.log(response.data);
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        })
        .catch((error) => {
            // console.log("error : ", error.response);
            return error.response;
        });
};

export const logout = () => {
    localStorage.removeItem("userData");
};

export const getCurrentUserInfo = () => {
    return JSON.parse(localStorage.getItem("userData"));
};