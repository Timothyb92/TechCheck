import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction,
  Dispatch,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import { http } from '../api';

import { UserType } from '../types/types';

export const AuthContext = createContext<{
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
}>({ user: null, setUser: () => {} });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const getUser = async (userId: number): Promise<UserType> => {
      const response = await http.get<UserType>(`/users/${userId}`);
      const user = response.data;

      return user;
    };

    const fetchAndSetUser = async () => {
      const urlToken = new URLSearchParams(window.location.search)
        .get('token')
        ?.toString();

      if (urlToken) {
        localStorage.setItem('token', urlToken);
        window.history.replaceState({}, '', window.location.pathname);
      }

      const token = urlToken || localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode<UserType>(token);
          const user = await getUser(decoded.id);
          setUser(user);
        } catch (err) {
          console.error(`Invalid token. ${err}`);
          setUser(null);
        }
      }
    };

    fetchAndSetUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
