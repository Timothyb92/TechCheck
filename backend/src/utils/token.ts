import jwt from 'jsonwebtoken';

import { JWT_SECRET, JWT_REFRESH_SECRET } from '../config/env';
const ACCESS_SECRET = JWT_SECRET!;
const REFRESH_SECRET = JWT_REFRESH_SECRET!;

export const createAccessToken = (userId: number) => {
  return jwt.sign({ id: userId }, ACCESS_SECRET, { expiresIn: '15m' });
};

export const createRefreshToken = (userId: number) => {
  return jwt.sign({ id: userId }, REFRESH_SECRET, { expiresIn: '7d' });
};
