export const Home = () => {
  const URL = import.meta.env.VITE_BASE_URL;
  const encodedURL = encodeURIComponent(URL);

  const getAuthUrl = (authUrl: string) => {
    return `https://discord.com/oauth2/authorize?client_id=1351311738284277800&response_type=code&redirect_uri=${authUrl}%2Fauth%2Fdiscord%2Fcallback&scope=identify+email+guilds`;
  };

  return (
    <div>
      <a href={getAuthUrl('http://localhost:8000')}>Localhost login</a>
      <br />
      <a href={getAuthUrl(encodedURL)}>LAN IP login</a>
    </div>
  );
};
