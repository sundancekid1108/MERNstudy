const authHeader = () => {
    //localStorage
    const token = JSON.parse(localStorage.getItem('token'));
    //Session
    // const token = JSON.parse(sessionStorage.getItem('token'));
    if (token) {
        return { 'x-access-token': token };
    }
};
//authHeader
export default authHeader;