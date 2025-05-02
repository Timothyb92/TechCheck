import { Request, Response } from 'express';

import { exchangeCode } from './auth.service';

export const httpDiscAuth = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;

    if (!code) {
      return res.status(400).json({ error: 'No auth code' });
    }

    const user = await exchangeCode(code);

    await fetch('http://localhost:8000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    return res.redirect('http://localhost:5173/lobby');
  } catch (err) {
    console.error(err);
  }
};
