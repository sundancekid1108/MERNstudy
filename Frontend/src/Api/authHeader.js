const authHeather = () => {
    // const user = JSON.parse(localStorage.getItem("user"));

    // if (user && user.accessToken) {
    //     // for Node.js Express back-end
    //     return { "x-access-token": user.accessToken };
    // } else {
    //     return {};
    // }
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
        return { "x-access-token": token };
    }
};

export default authHeather;