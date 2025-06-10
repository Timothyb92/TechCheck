import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { http } from '../../api';

import './createMatchForm.styles.css';

import { Button } from '../button/button.component';
import { CharacterList } from '../character-list/characterList.component';

import { emitCreateMatch } from '../../sockets/clientMatchSockets';
import { AuthContext } from '../../contexts/auth.context';

import { CharacterType, UserType, RankType } from '../../types/types';

export const CreateMatchForm = () => {
  const { user } = useContext(AuthContext);
  const [roomId, setRoomId] = useState('');
  const [ranks, setRanks] = useState<RankType[]>([]);
  const [minRank, setMinRank] = useState<RankType>({ id: 1, name: 'Any Rank' });
  const [maxRank, setMaxRank] = useState<RankType>({
    id: 40,
    name: 'Any Rank',
  });
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [selectedChar, setSelectedChar] = useState<CharacterType | null>({
    id: 999,
    name: 'Any Character',
  });

  const navigate = useNavigate();

  const roomIdExists = roomId.length > 0;

  useEffect(() => {
    const getCharacters = async () => {
      const response = await http.get<CharacterType[]>(`/api/characters`);
      setCharacters([...response.data]);
    };

    const getRanks = async () => {
      const response = await http.get<RankType[]>(`/api/ranks`);
      setRanks([...response.data]);
    };

    getRanks();
    getCharacters();
  }, []);

  return (
    <div className="match-form-container">
      <h1 className="arcade-glow">Create Match</h1>
      <div className="match-form-options">
        <div className="match-form-field">
          <label htmlFor="Custom Room ID">Room ID</label>
          <span className="required">Required</span>
          <input
            className={roomIdExists ? 'form-item' : 'form-item-warning'}
            type="text"
            name="Custom Room ID"
            required
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>

        <div className="match-form-field">
          <label htmlFor="characters">Select Opponent Character</label>
          <CharacterList
            characters={characters}
            className="form-item"
            options={{ showAnyCharacter: true }}
            selectedChar={selectedChar}
            onChangeCallback={(e) => {
              const charId = Number(e.target.value);
              const char = characters.find((c) => c.id === charId);
              setSelectedChar(char || null);
            }}
          />
        </div>

        <div className="match-form-field">
          <label htmlFor="min rank">Minimum Rank Requirement</label>
          <select
            className="form-item"
            name="min rank"
            id="min rank"
            onChange={(e) => {
              const rankId = Number(e.target.value) - 1;
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
        </div>

        <div className="match-form-field">
          <label htmlFor="max rank">Maximum Rank Requirement</label>
          <select
            className="form-item"
            name="max rank"
            id="max rank"
            onChange={(e) => {
              const rankId = Number(e.target.value) - 1;
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
        </div>

        <Button
          className={`create-match-button ${roomIdExists ? '' : 'disabled'}`}
          onClick={
            roomIdExists
              ? () => {
                  if (!selectedChar || !minRank || !maxRank) {
                    return new Error(
                      'Missing character or min/max rank selection'
                    );
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
                }
              : () => {
                  return new Error('Missing Custom Room ID');
                }
          }
        >
          Create Match
        </Button>
      </div>
    </div>
  );
};
