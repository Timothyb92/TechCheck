import express from 'express';

import discAuthRouter from '../auth/auth.routes';

const auth = express.Router();

auth.use('/discord', discAuthRouter);

export default auth;
