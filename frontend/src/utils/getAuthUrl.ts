export const localIpURL = encodeURIComponent(import.meta.env.VITE_BASE_URL);
export const encodedLocalIpURL = encodeURIComponent(localIpURL);

export const getAuthUrl = (authUrl: string) => {
  return `https://discord.com/oauth2/authorize?client_id=1351311738284277800&response_type=code&redirect_uri=${authUrl}%2Fauth%2Fdiscord%2Fcallback&scope=identify+email+guilds`;
};
