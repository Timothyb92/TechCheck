import express from 'express';

import {
  httpGetAllMatchRequests,
  httpGetOneMatchRequest,
  httpCreateMatchRequest,
  httpCancelMatchRequest,
  httpGetAllMatchesCreatedByUser,
  httpGetAllMatchesJoinedByUser,
  httpGetAllMatchesByUser,
} from './matchRequests.controller';

const matchRequestRouter = express.Router();

matchRequestRouter
  .route('/')
  .get(httpGetAllMatchRequests)
  .post(httpCreateMatchRequest);

matchRequestRouter.route('/:id').get(httpGetOneMatchRequest);

matchRequestRouter.route('/cancel/:id').put(httpCancelMatchRequest);

matchRequestRouter.route('/created-by/:id').get(httpGetAllMatchesCreatedByUser);

matchRequestRouter.route('/joined-by/:id').get(httpGetAllMatchesJoinedByUser);

matchRequestRouter.route('/all-by/:id').get(httpGetAllMatchesByUser);

export default matchRequestRouter;
