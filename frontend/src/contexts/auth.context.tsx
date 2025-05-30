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
}>({ user: null, setUser: () => {} });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const getUser = async (userId: number): Promise<UserType> => {
      const response = await http.get<UserType>(`/api/users/${userId}`);
      return response.data;
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
          localStorage.removeItem('token');
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

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
