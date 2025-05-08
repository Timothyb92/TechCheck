import express from 'express';

// import { authenticateJWT } from '../middleware/authenticateJWT';

import {
  httpGetAllMatches,
  httpGetOneMatch,
  httpCreateMatch,
  httpUpdateMatch,
  httpGetAllMatchesCreatedByUser,
  httpGetAllMatchesJoinedByUser,
  httpGetAllMatchesByUser,
  httpGetAllOpenMatches,
} from '../controllers/matches.controller';

const matchRouter = express.Router();

matchRouter.route('/').get(httpGetAllOpenMatches);
matchRouter.route('/created-by/:id').get(httpGetAllMatchesCreatedByUser);
matchRouter.route('/joined-by/:id').get(httpGetAllMatchesJoinedByUser);
matchRouter.route('/all-by/:id').get(httpGetAllMatchesByUser);
matchRouter.route('/all').get(httpGetAllMatches);
matchRouter.route('/:id').get(httpGetOneMatch);

// matchRouter.use(authenticateJWT);

matchRouter.route('/').post(httpCreateMatch);
matchRouter.route('/:id').put(httpUpdateMatch);

export default matchRouter;
