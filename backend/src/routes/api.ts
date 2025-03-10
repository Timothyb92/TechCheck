import express from 'express';

import userRouter from './users.router';
import matchRequestRouter from './matchRequests.router';
import characterRouter from './characters.router';

const api = express.Router();

api.use('/users', userRouter);
api.use('/matches', matchRequestRouter);
api.use('/characters', characterRouter);

export default api;
