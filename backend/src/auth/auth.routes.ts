import express from 'express';

import { httpDiscAuth, httpRefreshToken, httpLogout } from './auth.controller';

const discAuthRouter = express.Router();

discAuthRouter.route('/callback').get(httpDiscAuth);
discAuthRouter.post('/refresh', httpRefreshToken);
discAuthRouter.post('/logout', httpLogout);

export default discAuthRouter;
