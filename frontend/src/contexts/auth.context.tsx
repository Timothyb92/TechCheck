import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { jwtDecode } from 'jwt-decode';

import { http } from '../api';

type User = {
  id: number;
  cfnName?: string;
};

export const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({ user: null, setUser: () => {} });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async (userId: number): Promise<User> => {
      const response = await http.get<User>(`/users/${userId}`);
      return response.data;
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
          const decoded = jwtDecode<User>(token);
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
