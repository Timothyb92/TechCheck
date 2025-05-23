import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from '../../api';

import { Button } from '../button/button.component';

import { emitCreateMatch } from '../../sockets/clientMatchSockets';
import { AuthContext } from '../../contexts/auth.context';

import { CharacterType, UserType, RankType } from '../../types/types';

export const CreateMatchForm = () => {
  const { user } = useContext(AuthContext);
  const [roomId, setRoomId] = useState('');
  const [ranks, setRanks] = useState<RankType[]>([]);
  const [minRank, setMinRank] = useState<RankType>({ id: 1, name: 'Unranked' });
  const [maxRank, setMaxRank] = useState<RankType>({
    id: 1,
    name: 'Any Rank',
  });
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [selectedChar, setSelectedChar] = useState<CharacterType | null>({
    id: 999,
    name: 'Any Character',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getCharacters = async () => {
      const response = await http.get<CharacterType[]>(`/characters`);
      setCharacters([...response.data]);
    };

    const getRanks = async () => {
      const response = await http.get<RankType[]>(`/ranks`);
      setRanks([...response.data]);
    };

    getRanks();
    getCharacters();
  }, []);

  return (
    <>
      <form>
        <label htmlFor="Custom Room ID">Room ID</label>
        <input
          type="text"
          name="Custom Room ID"
          required
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />

        <br />

        <label htmlFor="characters">Select Opponent Character</label>
        <select
          name="characters"
          id="characters"
          onChange={(e) => {
            const charId = Number(e.target.value);
            const char = characters.find((c) => c.id === charId);
            setSelectedChar(char || null);
          }}
        >
          {characters.map((char) => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>

        <br />

        <label htmlFor="min rank">Minimum Rank Requirement</label>
        <select
          name="min rank"
          id="min rank"
          onChange={(e) => {
            const rankId = Number(e.target.value);
            const rank = ranks.find((r) => r.id === rankId);
            if (!rank) return new Error('No min rank set');
            setMinRank(rank);
          }}
        >
          {ranks.map((rank) => (
            <option key={rank.id} value={rank.id}>
              {rank.name}
            </option>
          ))}
        </select>

        <br />

        <label htmlFor="max rank">Maximum Rank Requirement</label>
        <select
          name="max rank"
          id="max rank"
          onChange={(e) => {
            const rankId = Number(e.target.value);
            const rank = ranks.find((r) => r.id === rankId);
            if (!rank) return new Error('No max rank set');
            setMaxRank(rank);
          }}
        >
          {ranks.map((rank) => (
            <option key={rank.id} value={rank.id}>
              {rank.name}
            </option>
          ))}
        </select>

        <br />

        <Button
          onClick={() => {
            if (!selectedChar || !minRank || !maxRank) {
              return new Error('Missing character or min/max rank selection');
            } else if (maxRank < minRank) {
              return new Error("Max rank can't be higehr than min rank");
            }
            emitCreateMatch(
              user as UserType,
              roomId,
              selectedChar.id,
              minRank.id,
              maxRank.id
            );
            navigate('/lobby');
          }}
        >
          Create Match
        </Button>
      </form>
    </>
  );
};
