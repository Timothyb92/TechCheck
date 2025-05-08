import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../config/env';

interface JwtPayload {
  id: number;
  cfnName?: string;
}

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  console.log(req.headers);
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log('No auth header middleware');
    return res.status(401).json({ message: 'Missing token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as JwtPayload;

    if (typeof decoded === 'string') {
      return res.status(403);
    }

    console.log('jwt auth middleware user: ', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('catch block in auht middleware');
    console.error(err);
    return res.status(403).json({ message: 'Invalid token' });
  }
};
