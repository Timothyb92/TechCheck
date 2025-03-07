import express from 'express';

import userRouter from './users.router';
import matchRequestRouter from './matchRequests.router';

const api = express.Router();

api.use('/users', userRouter);
api.use('/matches', matchRequestRouter);

export default api;
