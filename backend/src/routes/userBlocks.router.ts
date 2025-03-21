import express from 'express';

import {
  httpGetAllUserBlocks,
  httpBlockUser,
  httpUnblockUser,
} from '../controllers/userBlocks.controller';

const userBlocksRouter = express.Router();

userBlocksRouter
  .route('/')
  .get(httpGetAllUserBlocks)
  .put(httpBlockUser)
  .delete(httpUnblockUser);

export default userBlocksRouter;
