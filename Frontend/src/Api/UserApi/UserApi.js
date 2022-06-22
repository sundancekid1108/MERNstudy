import api from '../axiosApi';
import authHeader from '../authHeader';

//회원가입

export const userSignUp = (
  body
) => {
    return api
      .post('/users/signup', body)
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
export const userLogin = (body) => {
    return api
      .post('/users/auth/login', body)
      .then((response) => {
          if (response.data.accessToken) {
              //localStorage
              localStorage.setItem(
                'token',
                JSON.stringify(response.data.accessToken)
              );

              //session
              sessionStorage.setItem(
                'token',
                JSON.stringify(response.data.accessToken)
              );
              // localStorage.setItem('user', JSON.stringify(response.data));
              // localStorage.setItem('isAdmin', JSON.stringify(response.data.isAdmin));
          }
          // console.log('userLogin success');
          // console.log('response : ', response);
          return response;
      })
      .catch((error) => {
          console.log(error.status);
          console.log('error!! : ', error);

          return error;
      });
};

//facebook Auth Login
export const userFacebookAuthLogin = async(
    accessToken,
    email,
    userID,
    name
) => {
    const body = {
        accessToken,
        email,
        userID,
        name
    };
    // console.log('body', body);
    try {
        const res = await api.post('/users/auth/facebooklogin', body);

        console.log('userFacebookAuthLogin', res);
        if (res.data.accessToken) {
            localStorage.setItem('token', JSON.stringify(res.data.accessToken));
            //session
            // sessionStorage.setItem('token', JSON.stringify(res.data.accessToken));
        }
        return res;
    } catch (error) {
        console.log('userFacebookAuthLogin error', error);
        return error;
    }
};

//google Auth Login

export const userGoogleAuthLogin = async(response) => {
    console.log('userGoogleAuthLogin response', response);
    const body = response;
    try {
        const res = await api.post('/users/auth/googlelogin', body);
        console.log(res);
        return res;
    } catch (error) {
        console.log('userGoogleAuthLogin error', error);
        return error;
    }
};

//로그아웃
export const userLogout = () => {
    // console.log('RemoveToken!!');
    localStorage.removeItem('token');
    sessionStorage.clear();
    // localStorage.removeItem('user');
    // localStorage.removeItem('isAdmin');
};

//유저 정보 수정
export const updateUserInfo = async(
    userName,
    userEmail,
    userFirstName,
    userLastName,
    userPhoneNumber,
    userPassword
) => {
    // console.log("updateuserinfo");
    const token = authHeader();
    try {
        const res = await api.patch(
            '/users/updateuserinfo', {
                username: userName,
                email: userEmail,
                firstname: userFirstName,
                lastname: userLastName,
                phonenumber: userPhoneNumber,
                password: userPassword
            }, { headers: token }
        );

        console.log('updateuserinfo res', res);
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

        return res;
        // const response = res.data;
        // return response;
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
        // console.log('res.data : ', res.data);

        const response = res.data;
        // console.log("response", response)
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