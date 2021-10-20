const authHeader = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        return { 'x-access-token': token };
    }
};
//authHeader
export default authHeader;