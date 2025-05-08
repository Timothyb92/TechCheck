import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { exchangeCode } from './auth.discord.service';

import { JWT_SECRET } from '../config/env';

export const httpDiscAuth = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;

    if (!code) {
      return res.status(400).json({ error: 'No auth code' });
    }

    const user = await exchangeCode(code);
    const payload = {
      id: user.id,
      cfnName: user.cfnName,
    };

    if (!JWT_SECRET) {
      throw new Error(`JWT error`);
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    //TODO Change from fetch request to using the internal service to add user to db
    await fetch('http://192.168.5.230:8000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    return res.redirect(`http://192.168.5.230:5173/lobby?token=${token}`);
  } catch (err) {
    console.error(err);
  }
};
