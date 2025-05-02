import { Outlet, Link } from 'react-router-dom';

import './Navigation.styles.css';

import Logo from '../../assets/logo.png';

export const Navigation = () => {
  return (
    <>
      <div className="nav-container">
        <Link to="/">
          <img src={Logo} alt="Logo" className="nav-img" />
        </Link>
        <Link to="/lobby">Lobby</Link>
      </div>
      <Outlet />
    </>
  );
};
