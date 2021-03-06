import api from "../axiosApi";
import authHeader from "../authHeader";

// export const getPostList = api
//     .get("/posts/postlist")
//     .then((response) => {
//         const responseData = response.data;
//         // console.log("axios getPost responseData", responseData);
//         return responseData;
//     })
//     .catch((err) => {
//         console.log(err);
//     });

export const getPostList = () => {
    api
        .get("/posts/postlist")
        .then((response) => {
            const responseData = response.data;
            console.log("axios getPost responseData", responseData);
            return responseData;
        })
        .catch((err) => {
            console.log(err);
        });
};