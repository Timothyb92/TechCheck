import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaDiscord, FaUser } from 'react-icons/fa';

import { AuthContext } from '../../contexts/auth.context';
import { getAuthUrl, VITEurl } from '../../utils/getAuthUrl';
import { Button } from '../../components/button/button.component';

export const Navigation = () => {
  const { user } = useContext(AuthContext);

  const handleDiscordLogin = () => {
    window.location.href = getAuthUrl(VITEurl);
  };

  return (
    <>
      <div className="sticky top-0 z-50 w-full border-b border-[#8f00ff]/20 bg-[#19181c]/85 backdrop-blur-md">
        <div className="mx-auto flex w-[95%] max-w-6xl flex-col items-center justify-center gap-4 px-4 py-5 sm:flex-row sm:justify-between">
          <Link to="/lobby" className="transition-transform hover:scale-105">
            <p className="arcade-glow !text-[20px] sm:!text-[24px]">
              TechCheck
            </p>
          </Link>
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
              className="inline-flex items-center gap-3 rounded-lg bg-[#5865f2] px-4 py-2.5 text-lg font-bold shadow-xl transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_16px_#5865f2aa]"
            >
              <FaDiscord className="discord-icon" />
              Login with Discord
            </Button>
          )}
        </div>
        <div className="h-[2px] w-full bg-white shadow-[0_0_4px_#8f00ff,0_0_8px_#8f00ff,0_0_16px_#8f00ff,0_0_24px_#8f00ff]"></div>
      </div>
      <Outlet />
    </>
  );
};
