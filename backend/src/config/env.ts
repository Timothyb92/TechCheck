import dotenv from 'dotenv';

dotenv.config();

export const DISCORD_API_ENDPOINT = process.env.DISCORD_API_ENDPOINT;
export const DISCORD_TOKEN_ENDPOINT = process.env.DISCORD_TOKEN_ENDPOINT;
export const DISCORD_TOKEN_REVOCATION_ENDPOINT =
  process.env.DISCORD_TOKEN_REVOCATION_ENDPOINT;
export const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI!;
export const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID!;
export const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET!;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const API_BASE_URL = process.env.API_BASE_URL;
export const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;
export const CLIENT_BUILD_URL = process.env.CLIENT_BUILD_URL;
export const NODE_ENV = process.env.NODE_ENV;
