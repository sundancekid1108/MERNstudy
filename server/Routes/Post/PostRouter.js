import express from 'express';
import * as PostApi from '../../Controller/Post/PostController';
const postRouter = express.Router();

postRouter.get('/', PostApi.getPostList);

postRouter.post('/', PostApi.createPost);

postRouter.patch('/:id', PostApi.editPost);

postRouter.delete('/:id', PostApi.deletePost);

// module.exports = postRouter;
export default postRouter;
