import express from 'express';
const userRouter = express.Router();

userRouter.get('/user', (req, res) => {
  res.send({ response: 'UserApi test.' }).status(200);
});

export default userRouter;
