import express from 'express';

import {
  httpGetAllMatchRequests,
  httpGetOneMatchRequest,
  httpCreateMatchRequest,
  httpCancelMatchRequest,
} from './matchRequests.controller';

const matchRequestRouter = express.Router();

matchRequestRouter
  .route('/')
  .get(httpGetAllMatchRequests)
  .post(httpCreateMatchRequest);

matchRequestRouter.route('/:id').get(httpGetOneMatchRequest);

matchRequestRouter.route('/cancel/:id').put(httpCancelMatchRequest);

export default matchRequestRouter;
