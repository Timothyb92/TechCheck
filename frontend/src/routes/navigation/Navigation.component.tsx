import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaDiscord, FaUser } from 'react-icons/fa';

import { AuthContext } from '../../contexts/auth.context';
import { getAuthUrl, localIpURL } from '../../utils/getAuthUrl';
import { Button } from '../../components/button/button.component';

import './Navigation.styles.css';

// import Logo from '../../assets/logo.png';

export const Navigation = () => {
  const { user } = useContext(AuthContext);

  const handleDiscordLogin = () => {
    window.location.href = getAuthUrl(localIpURL);
  };

  return (
    <>
      <div className="nav-container">
        <Link to="/lobby">
          {/* <img src={Logo} alt="Logo" claseName="nav-img" /> */}
          <p className="arcade-glow">TechCheck</p>
        </Link>
        {/* <br />
        <Link to="/lobby">Lobby</Link> */}
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
