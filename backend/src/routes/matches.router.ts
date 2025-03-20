import express from 'express';

import {
  httpGetAllMatches,
  httpGetOneMatch,
  httpCreateMatch,
  httpCancelMatch,
  httpGetAllMatchesCreatedByUser,
  httpGetAllMatchesJoinedByUser,
  httpGetAllMatchesByUser,
} from '../controllers/matches.controller';

const matchRouter = express.Router();

matchRouter.route('/').get(httpGetAllMatches).post(httpCreateMatch);

matchRouter.route('/:id').get(httpGetOneMatch);

matchRouter.route('/cancel/:id').put(httpCancelMatch);

matchRouter.route('/created-by/:id').get(httpGetAllMatchesCreatedByUser);

matchRouter.route('/joined-by/:id').get(httpGetAllMatchesJoinedByUser);

matchRouter.route('/all-by/:id').get(httpGetAllMatchesByUser);

export default matchRouter;
