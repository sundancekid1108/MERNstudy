import api from '../axiosApi';
import authHeader from '../authHeader';

//회원가입
export const userSignUp = (
    username,
    email,
    firstname,
    lastname,
    password1,
    password2
) => {
    return api
        .post('/users/signup', {
            username: username,
            email: email,
            firstname: firstname,
            lastname: lastname,
            password1: password1,
            password2: password2
        })
        .then((response) => {
            // console.log("response : ", response);
            return response;
        })
        .catch((error) => {
            // console.log("error : ", error);
            // console.log("error!! : ", error.response);

            return error.response;
        });
};

// 로그인
export const userLogin = (email, password) => {
    return api
        .post('/users/auth/login', {
            email: email,
            password: password
        })
        .then((response) => {
            // console.log(response.data);
            if (response.data.accessToken) {
                // localStorage.setItem("user", JSON.stringify(response.data));
                localStorage.setItem(
                    'token',
                    JSON.stringify(response.data.accessToken)
                );
                localStorage.setItem('isAuthenticated', 'true');
            }
            return response.data;
        })
        .catch((error) => {
            // console.log(error.status);
            // console.log("error!! : ", error.response.data);

            return error;
        });
};

//로그아웃
export const userLogout = () => {
    console.log('RemoveToken!!');
    localStorage.removeItem('token');
};

//유저 정보 수정
export const editUserInfo = async(
    userName,
    userEmail,
    userFirstName,
    userLastName,
    userPhoneNumber,
    userPassword
) => {
    // console.log("edituserinfo");
    const token = authHeader();
    try {
        const res = await api.patch(
            '/users/edituserinfo', {
                username: userName,
                email: userEmail,
                firstname: userFirstName,
                lastname: userLastName,
                phonenumber: userPhoneNumber,
                password: userPassword
            }, { headers: token }
        );

        console.log('edituserinfo res', res);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};

//유저 정보 받아오기
export const getUserInfo = async() => {
    const token = authHeader();
    try {
        const res = await api.get('/users/userinfo', {
            headers: token
        });
        // console.log("res : ", res);

        const response = res.data;
        return response;
    } catch (error) {
        // console.log(error);
        return error;
    }
};

// 유저 리스트 받아오기

export const getUsersList = async() => {
    const token = authHeader();
    try {
        const res = await api.get('users/userlist', {
            headers: token
        });
        console.log('res.data : ', res.data);

        const response = res.data;
        return response;
    } catch (error) {
        // console.log(error);
        return error;
    }
};

//admin 유저 정보 삭제
export const deleteUserInfoByAdmin = async(selectedUserId) => {
    const token = authHeader();
    try {
        const res = await api.delete('/users/deleteuserbyid/' + selectedUserId, {
            headers: token
        });
        console.log(res);
        return res;
    } catch (error) {
        return error;
    }
};