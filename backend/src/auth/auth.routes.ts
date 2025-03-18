import express from 'express';

import { httpDiscAuth } from './auth.controller';

const discAuthRouter = express.Router();

discAuthRouter.route('/callback').get(httpDiscAuth);

export default discAuthRouter;
