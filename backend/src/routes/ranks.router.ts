import express from 'express';

import {
  httpGetAllRanks,
  httpGetOneRank,
} from '../controllers/ranks.controller';

const rankRouter = express.Router();

rankRouter.route('/').get(httpGetAllRanks);

rankRouter.route('/:id').get(httpGetOneRank);

export default rankRouter;
