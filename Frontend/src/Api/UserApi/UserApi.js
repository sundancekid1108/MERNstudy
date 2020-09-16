import api from "../axiosApi";

exports.userSignin = (username, email, password1, password2) => {
    api.post("/users/signup", {
        username,
        email,
        password1,
        password2
    }).then((response) => {
        const responseUserSigninData = response.data;
        return responseUserSigninData;
    }).catch((err) => {
        console.log(err)
    });
}

exports.userLogin = (email, password) => {
    api.post('/users/signin', {
        email,
        password
    }).then((response) => {
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data));

        }
        return response.data;
    }).catch((err) => {
        console.log(err);
    })
}

exports.logout = () => {
    localStorage.removeItem("user");
};

exports.getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};