import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

import { http } from '../api';

import { MatchType } from '../types/types';

export const MatchesContext = createContext<{
  matches: MatchType[];
  setMatches: Dispatch<SetStateAction<MatchType[]>>;
}>({ matches: [], setMatches: () => {} });

export const MatchesProvider = ({ children }: { children: ReactNode }) => {
  const [matches, setMatches] = useState<MatchType[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const { data } = await http.get<MatchType[]>('/api/matches');
        setMatches(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMatches();
  }, []);

  return (
    <MatchesContext.Provider value={{ matches, setMatches }}>
      {children}
    </MatchesContext.Provider>
  );
};

export const useMatchesContext = () => useContext(MatchesContext);
