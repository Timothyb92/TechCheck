import express from 'express';

import { httpDiscAuth, httpRefreshToken, httpLogout } from './auth.controller';

const authRouter = express.Router();

authRouter.get('/discord/callback', httpDiscAuth);

authRouter.post('/refresh', httpRefreshToken);
authRouter.post('/logout', httpLogout);

export default authRouter;
