import express from 'express';
import {
  httpCreateUser,
  httpGetAllUsers,
  httpGetOneUser,
  // httpDeleteUser,
  httpUpdateUser,
} from '../controllers/users.controller';

const userRouter = express.Router();

userRouter.route('/').get(httpGetAllUsers).post(httpCreateUser);

userRouter
  .route('/:id')
  .get(httpGetOneUser)
  // .delete(httpDeleteUser)
  .patch(httpUpdateUser);

export default userRouter;
