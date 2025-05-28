import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { exchangeCode } from './auth.discord.service';

import { JWT_SECRET, API_BASE_URL, CLIENT_BASE_URL } from '../config/env';

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

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

    //TODO Change from fetch request to using the internal service to add user to db
    await fetch(`${API_BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    return res.redirect(`${CLIENT_BASE_URL}/lobby?token=${token}`);
  } catch (err) {
    console.error(err);
  }
};
