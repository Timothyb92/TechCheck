import express from 'express';

import userRouter from './users.router';
import matchRouter from './matches.router';
import characterRouter from './characters.router';
import rankRouter from './ranks.router';

const api = express.Router();

api.use('/users', userRouter);
api.use('/matches', matchRouter);
api.use('/characters', characterRouter);
api.use('/ranks', rankRouter);

export default api;
