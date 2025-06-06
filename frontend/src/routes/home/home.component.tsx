import { getAuthUrl } from '../../utils/getAuthUrl';

export const Home = () => {
  const URL = import.meta.env.VITE_BASE_URL;
  const encodedURL = encodeURIComponent(URL);

  return (
    <div>
      <a href={getAuthUrl('http://localhost:8000')}>Localhost login</a>
      <br />
      <a href={getAuthUrl(encodedURL)}>LAN IP login</a>
    </div>
  );
};
