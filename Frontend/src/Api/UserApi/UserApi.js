import api from "../axiosApi";

export const userSignin = (username, email, password1, password2) => {
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
    api
        .post("users/auth/login", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const logout = () => {
    localStorage.removeItem("userData");
};

export const getCurrentUserInfo = () => {
    return JSON.parse(localStorage.getItem("userData"));
};