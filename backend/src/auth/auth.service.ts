// import { Request, Response } from 'express';
import fetch from 'node-fetch';

import {
  DISCORD_API_ENDPOINT,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_TOKEN_ENDPOINT,
  DISCORD_TOKEN_REVOCATION_ENDPOINT,
  DISCORD_REDIRECT_URI,
} from '../config/env';

export const exchangeCode = async (code: string) => {
  const data = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code.toString(),
    redirect_uri: DISCORD_REDIRECT_URI,
    client_id: DISCORD_CLIENT_ID,
    client_secret: DISCORD_CLIENT_SECRET,
  });

  const response = await fetch(`${DISCORD_TOKEN_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: data,
  });

  if (!response.ok) {
    throw new Error(`HTTP error - Status: ${response.status}`);
  }

  return await response.json();
};
