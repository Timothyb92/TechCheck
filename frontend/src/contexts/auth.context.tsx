import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import { http } from '../api';

import { UserType } from '../types/types';
import { disconnectSocket, initializeSocket } from '../sockets/index';

export const AuthContext = createContext<{
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
  logout: () => void;
}>({ user: null, setUser: () => {}, logout: () => {} });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const getUser = async (userId: number): Promise<UserType> => {
      const response = await http.get<UserType>(`/api/users/${userId}`);
      return response.data;
    };

    const refreshAccessToken = async (): Promise<string | null> => {
      try {
        const response = await http.post<{ accessToken: string }>(
          '/auth/refresh',
          {},
          { withCredentials: true }
        );
        const newToken = response.data.accessToken;
        localStorage.setItem('token', newToken);
        initializeSocket(newToken);
        return newToken;
      } catch (err) {
        console.error('Failed to refresh access token:', err);
        localStorage.removeItem('token');
        setUser(null);
        disconnectSocket();
        return null;
      }
    };

    const fetchAndSetUser = async () => {
      const urlToken = new URLSearchParams(window.location.search)
        .get('token')
        ?.toString();

      if (urlToken) {
        localStorage.setItem('token', urlToken);
        window.history.replaceState({}, '', window.location.pathname);
        window.location.reload();
        return;
      }

      const token = urlToken || localStorage.getItem('token');

      if (token) {
        initializeSocket(token);
        try {
          const decoded = jwtDecode<UserType>(token);
          const u = await getUser(decoded.id);
          setUser(u);
        } catch (err) {
          console.error('Failed to decode token or fetch user', err);

          const newToken = await refreshAccessToken();
          if (newToken) {
            const decoded = jwtDecode<UserType>(newToken);
            const u = await getUser(decoded.id);
            setUser(u);
          }
        }
      } else {
        initializeSocket();
      }
    };

    fetchAndSetUser();

    return () => {
      disconnectSocket();
    };
  }, []);

  const logout = async () => {
    try {
      await http.post('/auth/logout', {}, { withCredentials: true });
    } catch (err) {
      console.warn('Logout failed, clearing locally', err);
    }
    localStorage.removeItem('token');
    disconnectSocket();
    setUser(null);
    window.location.href = '/lobby';
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
