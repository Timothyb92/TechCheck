import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { exchangeCode } from './auth.discord.service';
import RefreshToken from '../models/refreshTokens';
import {
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  API_BASE_URL,
  CLIENT_BASE_URL,
  NODE_ENV,
} from '../config/env';

const ACCESS_TOKEN_EXPIRY = NODE_ENV === 'development' ? '5m' : '15m';
const REFRESH_TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface JwtPayload {
  id: string;
  cfnName?: string;
  exp?: number;
}

export const httpDiscAuth = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;

    if (!code) {
      return res.status(400).json({ error: 'No auth code' });
    }

    const user = await exchangeCode(code);
    const userId = +user.id;

    if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
      throw new Error(`Missing JWT env variables`);
    }

    const payload: JwtPayload = {
      id: user.id,
      cfnName: user.cfnName,
    };

    const accessToken = jwt.sign(payload, JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      domain:
        process.env.NODE_ENV === 'production' ? '.techcheck.gg' : undefined,
      maxAge: REFRESH_TOKEN_EXPIRY_MS,
      path: '/',
    });

    await fetch(`${API_BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    await RefreshToken.create({
      userId: +user.id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS),
    });

    return res.redirect(`${CLIENT_BASE_URL}/lobby?token=${accessToken}`);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const httpRefreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) return res.status(401).json({ message: 'Missing token' });

  try {
    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET!) as {
      id: string;
      cfnName: string; // ? Change this to disc username?
    };

    const stored = await RefreshToken.findOne({
      where: {
        token: refreshToken,
        userId: +payload.id,
      },
    });

    if (!stored)
      return res.status(403).json({ message: 'Invalid refresh token' });

    const newPayload = {
      id: payload.id,
      cfnName: payload.cfnName,
    };

    const newAccessToken = jwt.sign(newPayload, JWT_SECRET!, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });

    return res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error('Token refresh failed', err);
    return res
      .status(403)
      .json({ message: 'Refresh token expired or invalid' });
  }
};

export const httpLogout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) return res.sendStatus(204);

  try {
    await RefreshToken.destroy({ where: { token: refreshToken } });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    return res.sendStatus(204);
  } catch (err) {
    console.error('Logout failed:', err);
    return res.status(500).json({ message: 'Failed to logout' });
  }
};
