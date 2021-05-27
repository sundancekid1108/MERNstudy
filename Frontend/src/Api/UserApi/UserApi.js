import api from "../axiosApi";

export const userSignUp = (
    username,
    email,
    firstname,
    lastname,
    password1,
    password2
) => {
    return api
        .post("/users/signup", {
            username: username,
            email: email,
            firstname: firstname,
            lastname: lastname,
            password1: password1,
            password2: password2,
        })
        .then((response) => {
            console.log("response : ", response);
            return response;
        })
        .catch((error) => {
            console.log("error : ", error);
            return error;
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
                // localStorage.setItem("user", JSON.stringify(response.data));
                localStorage.setItem(
                    "token",
                    JSON.stringify(response.data.accessToken)
                );
            }
            return response.data;
        })
        .catch((error) => {
            // console.log("error : ", error.response.data);

            return error;
        });
};

export const logout = () => {
    localStorage.removeItem("userData");
};

export const getCurrentUserInfo = () => {
    return JSON.parse(localStorage.getItem("userData"));
};