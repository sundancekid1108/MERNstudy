import express from 'express';
import * as PostApi from '../../Controller/Post/PostController';
const postRouter = express.Router();

postRouter.get('/postlist', PostApi.getPostList);

postRouter.get('/getpostdetail/:id', PostApi.getPostDetail);

postRouter.post('/createpost', PostApi.createPost);

postRouter.patch('/editpost/:id', PostApi.editPost);

postRouter.delete('/deletepost/:id', PostApi.deletePost);

// module.exports = postRouter;
export default postRouter;
