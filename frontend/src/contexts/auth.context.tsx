import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
  useRef,
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
  const refreshTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const getUser = async (userId: number): Promise<UserType> => {
      const response = await http.get<UserType>(`/api/users/${userId}`);
      return response.data;
    };

    const scheduleTokenRefresh = () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const decoded = jwtDecode<{ exp: number }>(token);
      const timeUntilExpiry = decoded.exp * 1000 - Date.now();

      if (timeUntilExpiry <= 0) {
        console.warn(
          '[Auth] Token already expired, skipping refresh schedule.'
        );
        return;
      }

      const refreshIn = Math.max(timeUntilExpiry - 5000, 1000);

      if (refreshTimer.current) {
        clearTimeout(refreshTimer.current);
      }

      refreshTimer.current = setTimeout(async () => {
        await refreshAccessToken(scheduleTokenRefresh);
      }, refreshIn);
    };

    const refreshAccessToken = async (
      onSuccess?: () => void
    ): Promise<string | null> => {
      try {
        const response = await http.post<{ accessToken: string }>(
          '/api/auth/refresh',
          {},
          { withCredentials: true }
        );

        const newToken = response.data.accessToken;

        localStorage.setItem('token', newToken);
        initializeSocket(newToken);

        if (onSuccess) onSuccess();

        return newToken;
      } catch (err) {
        console.error('Failed to refresh access token:', err);

        try {
          await http.post('/api/auth/logout', {}, { withCredentials: true });
        } catch (logoutErr) {
          console.warn('[Auth] Logout request failed:', logoutErr);
        }

        localStorage.removeItem('token');
        disconnectSocket();
        setUser(null);
        window.location.href = '/lobby';

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

      const token = localStorage.getItem('token');

      if (token) {
        const decoded = jwtDecode<{ id: number; exp: number }>(token);

        if (decoded.exp * 1000 < Date.now()) {
          console.warn('[Auth] Token is expired. Attempting refresh...');
          const newToken = await refreshAccessToken();
          if (newToken) {
            const newDecoded = jwtDecode<{ id: number }>(newToken);
            const u = await getUser(newDecoded.id);
            setUser(u);
            scheduleTokenRefresh();
            initializeSocket(newToken);
          } else {
            console.warn('[Auth] Refresh failed. Logging out...');
            logout();
          }
          return;
        }

        try {
          const u = await getUser(decoded.id);
          setUser(u);
          scheduleTokenRefresh();
          initializeSocket(token);
        } catch (err) {
          console.error('[Auth] Failed to fetch user with valid token:', err);
          logout();
        }
      } else {
        initializeSocket();
      }
    };

    fetchAndSetUser();

    return () => {
      if (refreshTimer.current) {
        clearTimeout(refreshTimer.current);
      }
      disconnectSocket();
    };
  }, []);

  const logout = async () => {
    try {
      await http.post('/api/auth/logout', {}, { withCredentials: true });
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
