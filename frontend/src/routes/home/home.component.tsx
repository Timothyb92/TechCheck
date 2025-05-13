export const Home = () => {
  return (
    <div>
      <a href="https://discord.com/oauth2/authorize?client_id=1351311738284277800&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fauth%2Fdiscord%2Fcallback&scope=identify+guilds+email">
        Login
      </a>
      <br />
      <a href="https://discord.com/oauth2/authorize?client_id=1351311738284277800&response_type=code&redirect_uri=http%3A%2F%2F192.168.5.230%3A8000%2Fauth%2Fdiscord%2Fcallback&scope=identify+email+guilds">
        LAN IP login
      </a>
    </div>
  );
};
