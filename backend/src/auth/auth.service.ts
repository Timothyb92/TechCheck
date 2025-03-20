import fetch from 'node-fetch';

import {
  DISCORD_API_ENDPOINT,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_TOKEN_ENDPOINT,
  DISCORD_TOKEN_REVOCATION_ENDPOINT,
  DISCORD_REDIRECT_URI,
} from '../config/env';

type Token = {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
};

type User = {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  email?: string;
};

export const exchangeCode = async (code: string): Promise<User & Token> => {
  try {
    const data = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code.toString(),
      redirect_uri: DISCORD_REDIRECT_URI,
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
    });

    const tokenResponse = await fetch(`${DISCORD_TOKEN_ENDPOINT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: data,
    });

    if (!tokenResponse.ok) {
      throw new Error(`Failed to exchange token: ${tokenResponse.statusText}`);
    }

    const tokenData = (await tokenResponse.json()) as Token;

    const userResponse: any = await fetch(`${DISCORD_API_ENDPOINT}/users/@me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error(
        `Failed to fetch user info - Status: ${userResponse.status}`
      );
    }

    const userInfo = await userResponse.json();
    const userPlusTokenData = { ...userInfo, ...tokenData, id: +userInfo.id };

    await fetch('http://localhost:8000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userPlusTokenData),
    });

    return userPlusTokenData;
  } catch (err) {
    console.error(`OAuth Error: ${err}`);
    throw new Error('OAuth authentication failed');
  }
  //TODO: Look into refreshing tokens so users don't have to reauth every 7 days
};
