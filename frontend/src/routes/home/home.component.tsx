interface HomeProps {
  message: string;
  createMatchListener: (event: React.MouseEvent<HTMLButtonElement>) => void;
  updateMatchListener: (event: React.MouseEvent<HTMLButtonElement>) => void;
  updateUser: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Home = ({
  message,
  createMatchListener,
  updateMatchListener,
  updateUser,
}: HomeProps) => {
  return (
    <div>
      <h1>{message || 'Loading...'}</h1>
      <a href="https://discord.com/oauth2/authorize?client_id=1351311738284277800&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fauth%2Fdiscord%2Fcallback&scope=identify+guilds+email">
        Login
      </a>
      <br />
      <a href="https://discord.com/oauth2/authorize?client_id=1351311738284277800&response_type=code&redirect_uri=http%3A%2F%2F192.168.5.230%3A8000%2Fauth%2Fdiscord%2Fcallback&scope=identify+email+guilds">
        LAN IP login
      </a>
      <button onClick={createMatchListener}>Create match</button>
      <div id="matches"></div>
      <br />
      <button onClick={updateMatchListener}>Apply to join</button>
      <button onClick={updateUser}>Manual user update</button>
    </div>
  );
};
