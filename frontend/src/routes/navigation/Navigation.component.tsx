import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaDiscord, FaUser } from 'react-icons/fa';

import { AuthContext } from '../../contexts/auth.context';
import { getAuthUrl, VITEurl } from '../../utils/getAuthUrl';
import { Button } from '../../components/button/button.component';

import './Navigation.styles.css';

export const Navigation = () => {
  const { user } = useContext(AuthContext);

  const handleDiscordLogin = () => {
    window.location.href = getAuthUrl(VITEurl);
  };

  return (
    <>
      <div className="nav-container">
        <Link to="/lobby">
          <p className="arcade-glow">TechCheck</p>
        </Link>
        <br />
        {user ? (
          <Link to="/user">
            <Button className="arcade-button">
              <FaUser />
              User Settings
            </Button>
          </Link>
        ) : (
          <Button
            onClick={handleDiscordLogin}
            className="nav-button discord-login-button"
          >
            <FaDiscord className="discord-icon" />
            Login with Discord
          </Button>
        )}
      </div>
      <Outlet />
    </>
  );
};
