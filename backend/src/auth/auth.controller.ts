import { Request, Response } from 'express';

import { exchangeCode } from './auth.service';

export const httpDiscAuth = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;

    if (!code) {
      return res.status(400).json({ error: 'No auth code' });
    }

    const user = await exchangeCode(code);

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
  }
};
